import { ParamsDictionary } from 'express-serve-static-core';

export interface GetProductQueryRequestDto extends ParamsDictionary {
  productId: string;
}

export interface GetProductResponseDto {
  id: number;
  cost: number;
  sellerId: number;
  productName: string;
  amountAvailable: number;
}

export interface CreateProductRequestDto {
  cost: number;
  productName: string;
  amountAvailable: number;
}

export interface CreateProductResponseDto {
  id: number;
  cost: number;
  sellerId: number;
  productName: string;
  amountAvailable: number;
}
