import { Product } from '@lib/db/interfaces';
import { Products } from '@lib/db/models';

export interface DepositTransaction {
  totalCost: number;
  change: number;
  product: Products;
}
