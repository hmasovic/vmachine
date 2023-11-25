import { logger } from '@logs/index';

import { buildMessageResponse } from '@lib/helpers';
import { SessionsService, UsersService } from '@services/index';

import { CreateUserResponseDto, LoginUserResponseDto } from '@schemes/interfaces';
import { CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse, LogoutUserFromAllSessionsRequest, LogoutUserFromAllSessionsResponse } from '@schemes/users';

import { HTTP_STATUSES } from '@lib/constants';
import { ActiveSessionExists, UserNotFound } from '@lib/exceptions';

/**
 * Handler function used for creating a new user.
 *
 * @param  {CreateUserRequest} req - Request defined in the schemes
 * @param  {CreateUserResponse} res - Response defined in the schemes
 */
export const createUser = async (req: CreateUserRequest, res: CreateUserResponse) => {
  try {
    const newUser = await UsersService.createUser(req.body);

    const result: CreateUserResponseDto = {
      username: newUser.username,
      role: newUser.role,
    };

    return res.status(HTTP_STATUSES.CREATED).send(result);
  } catch (error) {
    logger.error(`[handlers/user/createUser] - ${error.message}`);
    return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(buildMessageResponse('An error occured, please contact support!'));
  }
};

/**
 * Handler function used for logging in a user.
 *
 * @param  {LoginUserRequest} req - Request defined in the schemes
 * @param  {LoginUserResponse} res - Response defined in the schemes
 */
export const loginUser = async (req: LoginUserRequest, res: LoginUserResponse) => {
  try {
    const userMetadata = await UsersService.loginUser(req.body.username, req.body.password);

    const result: LoginUserResponseDto = {
      token: userMetadata.token,
      expirationDate: userMetadata.expirationDate,
    };

    return res.status(HTTP_STATUSES.OK).send(result);
  } catch (e) {
    logger.error(`[handlers/user/loginUser] - ${e.message}`);

    const loginIssue = e instanceof UserNotFound || e instanceof ActiveSessionExists;

    const message = loginIssue ? e.message : 'An error occured, please contact support!';
    const status = loginIssue ? HTTP_STATUSES.UNPROCESSABLE_ENTITY : HTTP_STATUSES.INTERNAL_SERVER_ERROR;

    return res.status(status).send(buildMessageResponse(message));
  }
};

/**
 * Handler function used for logging out an user from all sessions.
 *
 * @param  {LogoutUserFromAllSessionsRequest} req - Request defined in the schemes
 * @param  {LogoutUserFromAllSessionsResponse} res - Response defined in the schemes
 */
export const logoutUserFromAllSessions = async (req: LogoutUserFromAllSessionsRequest, res: LogoutUserFromAllSessionsResponse) => {
  try {
    const user = req.locals?.user;

    await SessionsService.logoutUserFromAllSessions(user.id);

    return res.status(HTTP_STATUSES.OK).send(buildMessageResponse('Successfully logged out from all active sessions!'));
  } catch (e) {
    logger.error(`[handlers/user/logoutUserFromAllSessions] - ${e.message}`);
    return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(buildMessageResponse('An error occured, please contact support!'));
  }
};
