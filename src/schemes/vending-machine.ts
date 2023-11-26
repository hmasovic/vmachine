import { BuyProductRequestDto, BuyProductResponseDto, DepositCoinRequestDto, DepositCoinResponseDto, ResetDepositedCoinsResponseDto } from './interfaces';

import { BaseResponse, SecuredBaseBodyRequest } from './common';

// requests
export interface DepositCoinRequest extends SecuredBaseBodyRequest<DepositCoinRequestDto> {}
export interface BuyProductRequest extends SecuredBaseBodyRequest<BuyProductRequestDto> {}
export interface ResetDepositedCoinsRequest extends SecuredBaseBodyRequest<{}> {}

// responses
export interface DepositCoinResponse extends BaseResponse<DepositCoinResponseDto> {}
export interface BuyProductResponse extends BaseResponse<BuyProductResponseDto> {}
export interface ResetDepositedCoinsResponse extends BaseResponse<ResetDepositedCoinsResponseDto> {}
