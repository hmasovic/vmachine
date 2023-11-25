import { CreateUserRequestDto, CreateUserResponseDto, GetUserResponseDto, LoginUserRequestDto, LoginUserResponseDto, UpdateUserRequestDto, UpdateUserResponseDto } from './interfaces';

import { BaseBodyRequest, BaseResponse, SecuredBaseBodyRequest } from './common';

// requests
export interface CreateUserRequest extends BaseBodyRequest<CreateUserRequestDto> {}
export interface LoginUserRequest extends BaseBodyRequest<LoginUserRequestDto> {}
export interface LogoutUserFromAllSessionsRequest extends SecuredBaseBodyRequest<{}> {}
export interface GetUserRequest extends SecuredBaseBodyRequest<{}> {}
export interface UpdateUserRequest extends SecuredBaseBodyRequest<UpdateUserRequestDto> {}
export interface DeleteUserRequest extends SecuredBaseBodyRequest<{}> {}

// responses
export interface CreateUserResponse extends BaseResponse<CreateUserResponseDto> {}
export interface LoginUserResponse extends BaseResponse<LoginUserResponseDto> {}
export interface LogoutUserFromAllSessionsResponse extends BaseResponse<{}> {}
export interface GetUserResponse extends BaseResponse<GetUserResponseDto> {}
export interface UpdateUserResponse extends BaseResponse<UpdateUserResponseDto> {}
export interface DeleteUserResponse extends BaseResponse<{}> {}
