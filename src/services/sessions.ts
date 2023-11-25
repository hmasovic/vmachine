import { SessionsRepository } from '@repositories/index';

import { AuthenticatedUser } from './interfaces';

/**
 * Service function used for getting an user based on the token / session provided.
 *
 * @param  {string} token - The session token
 * @returns Promise - Result delegated back as {@link AuthenticatedUser}
 */
export const getUserBySessionToken = async (token: string): Promise<AuthenticatedUser | null> => {
  const user = await SessionsRepository.getUserViaActiveSession(token);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role,
  };
};

/**
 * Service function used for logging out the user from all active sessions.
 *
 * @param  {number} userId - The user id
 */
export const logoutUserFromAllSessions = async (userId: number) => {
  await SessionsRepository.markAllUserSessionsAsInactive(userId);
};
