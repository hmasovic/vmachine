import { getUserViaActiveSession } from '@repositories/sessions';

import { AuthenticatedUser } from './interfaces';

/**
 * Service function used for getting an user based on the token / session provided.
 *
 * @param  {string} token - The session token
 * @returns Promise - Result delegated back as {@link AuthenticatedUser}
 */
export const getUserBySessionToken = async (token: string): Promise<AuthenticatedUser | null> => {
  const user = await getUserViaActiveSession(token);

  if (!user) {
    return null;
  }

  return {
    username: user.username,
    role: user.role,
  };
};
