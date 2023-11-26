import moment from 'moment';
import { Op } from 'sequelize';

import { Session } from '@lib/db/interfaces';
import { Sessions, Users } from '@lib/db/models';

/**
 * Repository function used for creating a new session for a specific user.
 *
 * @param  {Session} session - The new session
 * @returns Promise - Result delegated back as {@link Sessions}
 */
export const createSession = async (session: Session): Promise<Sessions> => {
  return Sessions.create(session, { returning: true });
};

/**
 * Repository function used for getting all of the active sessions for a user.
 *
 * @param  {number} userId - The user id
 * @returns Promise - Result delegated back as an array of {@link Sessions}
 */
export const getAllActiveSessions = async (userId: number): Promise<Sessions[]> => {
  const now = moment().utc().toDate();

  return Sessions.findAll({
    where: {
      userId,
      isActive: true,
      expireTimestamp: {
        [Op.gt]: now,
      },
    },
  });
};

/**
 * Repository function used for getting an user based on the token provided for an active session.
 *
 * @param  {string} token - The session token
 * @returns Promise - Result delegated back as {@link Users}
 */
export const getUserViaActiveSession = async (token: string): Promise<Users | null> => {
  const now = moment().utc().toDate();

  const session = await Sessions.findOne({
    where: {
      token,
      isActive: true,
      expireTimestamp: {
        [Op.gt]: now,
      },
    },
    include: [
      {
        model: Users,
        as: 'user',
        required: true,
      },
    ],
  });

  if (!session) {
    return null;
  }

  return session.user;
};

/**
 * Repository function used for marking all of the users sessions as inactive.
 *
 * @param  {string} userId - The user id
 */
export const markAllUserSessionsAsInactive = async (userId: number) => {
  await Sessions.update({ isActive: false }, { where: { userId, isActive: true } });
};
