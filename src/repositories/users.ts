import { Transaction } from 'sequelize';

import db from '@lib/db';

import { User } from '@lib/db/interfaces';
import { Users } from '@lib/db/models';

import { EntityNotUpdated } from '@lib/exceptions';

/**
 * Repository function used for creating a new user.
 *
 * @param  {User} user - The new user's data
 * @returns Promise - Result delegated back as {@link Users}
 */
export const createUser = async (user: User): Promise<Users> => {
  return Users.create(user, { returning: true });
};

/**
 * Repository function used for updating an user.
 *
 * @param  {User} user - The user's partial data
 * @returns Promise - Result delegated back as {@link Users}
 */
export const updateUser = async (user: Partial<User>): Promise<Users> => {
  const [usersAffected, users] = await Users.update(user, { where: { id: user.id }, returning: true });

  if (usersAffected === 0) {
    throw new EntityNotUpdated(`User with the id: ${user.id} was not updated!`);
  }

  return users?.[0];
};

/**
 * Repository function used for deleting an user with the id provided.
 *
 * @param  {number} id - The user id
 */
export const deleteUser = async (id: number) => {
  await Users.destroy({ where: { id } });
};

/**
 * Repository function used for getting an user by their username and password.
 *
 * @param  {string} username - User's username
 * @param  {string} hashedPassword - User's hashed password
 * @returns Promise - Result delegated back as {@link Users}
 */
export const getUserByUsernamePassword = async (username: string, hashedPassword: string): Promise<Users> => {
  return Users.findOne({ where: { username, password: hashedPassword } });
};
