export interface DepositCoinRequestDto {
  coin: number;
}

export interface DepositCoinResponseDto {
  totalDeposited: number;
}

export interface BuyProductRequestDto {
  productId: number;
  amount: number;
}

export interface BuyProductResponseDto {
  totalSpent: number;
  product: {
    productName: string;
    cost: number;
  };
  changeAmount: number;
  changeInCoins: number[];
  changeRepresentationInCoins: number[];
}

export interface ResetDepositedCoinsResponseDto extends DepositCoinResponseDto {}
