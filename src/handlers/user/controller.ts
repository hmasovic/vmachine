import { logger } from '@logs/index';
import { UniqueConstraintError } from 'sequelize';

import { buildMessageResponse } from '@lib/helpers';
import { SessionsService, UsersService } from '@services/index';

import { CreateUserResponseDto, GetUserResponseDto, LoginUserResponseDto } from '@schemes/interfaces';
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserRequest,
  GetUserResponse,
  LoginUserRequest,
  LoginUserResponse,
  LogoutUserFromAllSessionsRequest,
  LogoutUserFromAllSessionsResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@schemes/users';

import { HTTP_STATUSES } from '@lib/constants';
import { ActiveSessionExists, EntityNotFound } from '@lib/exceptions';

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

    const uniqueConstraintError = error instanceof UniqueConstraintError;

    const message = uniqueConstraintError ? 'Username already exists, please choose a new one.' : 'An error occured, please contact support!';
    const status = uniqueConstraintError ? HTTP_STATUSES.UNPROCESSABLE_ENTITY : HTTP_STATUSES.INTERNAL_SERVER_ERROR;

    return res.status(status).send(buildMessageResponse(message));
  }
};

/**
 * Handler function used for getting the info about the user.
 *
 * @param  {GetUserRequest} req - Request defined in the schemes
 * @param  {GetUserResponse} res - Response defined in the schemes
 */
export const getUser = async (req: GetUserRequest, res: GetUserResponse) => {
  try {
    const user = req.locals.user;
    const result: GetUserResponseDto = { id: user.id, username: user.username, role: user.role };

    return res.status(HTTP_STATUSES.OK).send(result);
  } catch (e) {
    logger.error(`[handlers/user/getUser] - ${e.message}`);
    return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(buildMessageResponse('An error occured, please contact support!'));
  }
};

/**
 * Handler function used for updating the info about the user.
 *
 * @param  {UpdateUserRequest} req - Request defined in the schemes
 * @param  {UpdateUserResponse} res - Response defined in the schemes
 */
export const updateUser = async (req: UpdateUserRequest, res: UpdateUserResponse) => {
  try {
    const user = req.locals.user;
    const updatedUser = await UsersService.updateUser(user.id, req.body);

    const result = {
      id: updatedUser.id,
      username: updatedUser.username,
    };

    return res.status(HTTP_STATUSES.OK).send(result);
  } catch (e) {
    logger.error(`[handlers/user/updateUser] - ${e.message}`);
    return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(buildMessageResponse('An error occured, please contact support!'));
  }
};

/**
 * Handler function used for deleting the user from the system.
 *
 * @param  {DeleteUserRequest} req - Request defined in the schemes
 * @param  {DeleteUserResponse} res - Response defined in the schemes
 */
export const deleteUser = async (req: DeleteUserRequest, res: DeleteUserResponse) => {
  try {
    const user = req.locals.user;

    await UsersService.deleteUser(user.id);

    return res.status(HTTP_STATUSES.OK).send(buildMessageResponse('Successfully deleted the user!'));
  } catch (e) {
    logger.error(`[handlers/user/deleteUser] - ${e.message}`);
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

    const loginIssue = e instanceof EntityNotFound || e instanceof ActiveSessionExists;

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
