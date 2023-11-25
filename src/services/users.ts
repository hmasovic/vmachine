import { TOKEN_EXPIRY_HOURS } from '@config/index';
import moment from 'moment';

import { createHashedPassword, createRandomToken } from '@lib/helpers';
import { SessionsRepository, UsersRepository } from '@repositories/index';

import { User } from '@lib/db/interfaces';
import { Users } from '@lib/db/models';
import { NewUserInfo, UserLoginMetadata } from './interfaces';

import { ActiveSessionExists, UserNotFound } from '@lib/exceptions';

/**
 * Service function used for creating a user.
 *
 * @param  {NewUserInfo} userData - The new user data
 * @returns Promise - Result delegated back as {@link Users}
 */
export const createUser = async (userData: NewUserInfo): Promise<Users> => {
  const hashedPassword = createHashedPassword(userData.password);

  const newUser: User = {
    deposit: 0,
    role: userData.role,
    password: hashedPassword,
    username: userData.username,
  };

  return await UsersRepository.createUser(newUser);
};

/**
 * Service function used for logging in a user / creating a new session for the user.
 *
 * @param  {string} username - The username
 * @param  {string} password - The password
 * @returns Promise - Result delegated back as {@link UserLoginMetadata}
 */
export const loginUser = async (username: string, password: string): Promise<UserLoginMetadata> => {
  const hashedPassword = createHashedPassword(password);
  const user = await UsersRepository.getUserByUsernamePassword(username, hashedPassword);

  if (!user) {
    throw new UserNotFound(`User with the username: ${username} not found!`);
  }

  const userActiveSessions = await SessionsRepository.getAllActiveSessions(user.id);

  if (userActiveSessions.length !== 0) {
    throw new ActiveSessionExists(`User with the username: ${username} not found!`);
  }

  const expireTimestamp = moment().add(TOKEN_EXPIRY_HOURS, 'h').toDate();
  const token = createRandomToken();

  await SessionsRepository.createSession({
    token,
    isActive: true,
    userId: user.id,
    expireTimestamp,
  });

  return {
    token,
    expirationDate: expireTimestamp,
  };
};
