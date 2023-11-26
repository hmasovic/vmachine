import { CreateProductRequestDto, CreateProductResponseDto, GetProductQueryRequestDto, GetProductResponseDto } from './interfaces';

import { BaseResponse, SecuredBaseBodyRequest, SecuredBaseQueryRequest } from './common';

// requests
export interface GetProductRequest extends SecuredBaseQueryRequest<GetProductQueryRequestDto> {}
export interface CreateProductRequest extends SecuredBaseBodyRequest<CreateProductRequestDto> {}
export interface UpdateProductRequest extends SecuredBaseBodyRequest<{}> {}
export interface DeleteProductRequest extends SecuredBaseBodyRequest<{}> {}

// responses
export interface GetProductResponse extends BaseResponse<GetProductResponseDto> {}
export interface CreateProductResponse extends BaseResponse<CreateProductResponseDto> {}
export interface UpdateProductResponse extends BaseResponse<{}> {}
export interface DeleteProductResponse extends BaseResponse<{}> {}
