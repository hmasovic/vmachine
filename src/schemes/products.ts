import {
  CreateProductRequestDto,
  CreateProductResponseDto,
  DeleteProductRequestDto,
  GetProductQueryRequestDto,
  GetProductResponseDto,
  UpdateProductRequestDto,
  UpdateProductResponseDto,
} from './interfaces';

import { BaseResponse, SecuredBaseBodyRequest, SecuredBaseQueryRequest } from './common';

// requests
export interface GetProductRequest extends SecuredBaseQueryRequest<GetProductQueryRequestDto> {}
export interface CreateProductRequest extends SecuredBaseBodyRequest<CreateProductRequestDto> {}
export interface UpdateProductRequest extends SecuredBaseBodyRequest<UpdateProductRequestDto> {}
export interface DeleteProductRequest extends SecuredBaseBodyRequest<DeleteProductRequestDto> {}

// responses
export interface GetProductResponse extends BaseResponse<GetProductResponseDto> {}
export interface CreateProductResponse extends BaseResponse<CreateProductResponseDto> {}
export interface UpdateProductResponse extends BaseResponse<UpdateProductResponseDto> {}
export interface DeleteProductResponse extends BaseResponse<{}> {}
