import { CreateUserRequestDto, CreateUserResponseDto, LoginUserRequestDto, LoginUserResponseDto } from './interfaces';

import { BaseBodyRequest, BaseResponse, SecuredBaseBodyRequest } from './common';

// requests
export interface CreateUserRequest extends BaseBodyRequest<CreateUserRequestDto> {}
export interface LoginUserRequest extends BaseBodyRequest<LoginUserRequestDto> {}
export interface LogoutUserFromAllSessionsRequest extends SecuredBaseBodyRequest<{}> {}

// responses
export interface CreateUserResponse extends BaseResponse<CreateUserResponseDto> {}
export interface LoginUserResponse extends BaseResponse<LoginUserResponseDto> {}
export interface LogoutUserFromAllSessionsResponse extends BaseResponse<{}> {}
