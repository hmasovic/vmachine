export interface BuyProductTransactionMetadata {
  totalSpent: number;
  product: {
    productName: string;
    cost: number;
  };
  changeAmount: number;
  changeInCoins: number[];
  changeRepresentationInCoins: number[];
}
