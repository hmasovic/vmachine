import { User } from '@lib/db/interfaces';
import { Users } from '@lib/db/models';

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
 * Repository function used for getting an user by their id.
 *
 * @param  {number} id - The user id
 * @returns Promise - Result delegated back as {@link Users}
 */
export const getUserById = async (id: number): Promise<Users> => {
  return Users.findOne({ where: { id } });
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

/**
 * Repository function used for updating an user with the data provided.
 *
 * @param  {number} id - The user id
 * @param  {User} data - Result delegated back as {@link Users}
 */
export const updateUser = async (id: number, data: User) => {
  return Users.update(data, { where: { id }, returning: true });
};

/**
 * Repository function used for deleting an user with the id provided.
 *
 * @param  {number} id - The user id
 */
export const deleteUser = async (id: number) => {
  await Users.destroy({ where: { id } });
};
