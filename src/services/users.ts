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
 * Service function used for updating an user.
 *
 * @param  {number} id - The user id
 * @param  {Partial<User>} userData - User's partial data
 * @returns Promise - Result delegated back as {@link Users}
 */
export const updateUser = async (id: number, userData: Partial<User>): Promise<Users> => {
  return await UsersRepository.updateUser({ ...userData, id });
};

/**
 * Service function used for deleting an user.
 *
 * @param  {number} id - The user id
 * @returns Promise - Result delegated back as {@link Users}
 */
export const deleteUser = async (id: number) => {
  return await UsersRepository.deleteUser(id);
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
    throw new ActiveSessionExists(`User with username: ${username} already has an active session!`);
  }

  const token = createRandomToken();
  const expireTimestamp = moment().utc().add(TOKEN_EXPIRY_HOURS, 'h').toDate();

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
