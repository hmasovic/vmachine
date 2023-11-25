import { CreateUserRequestDto, CreateUserResponseDto, LoginUserRequestDto, LoginUserResponseDto } from './interfaces';

import { BaseBodyRequest, BaseResponse } from './common';

// requests
export interface CreateUserRequest extends BaseBodyRequest<CreateUserRequestDto> {}
export interface LoginUserRequest extends BaseBodyRequest<LoginUserRequestDto> {}

// responses
export interface CreateUserResponse extends BaseResponse<CreateUserResponseDto> {}
export interface LoginUserResponse extends BaseResponse<LoginUserResponseDto> {}
