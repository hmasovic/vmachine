export enum HTTP_STATUSES {
  OK = 200,
  CREATED = 201,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,

  INTERNAL_SERVER_ERROR = 500,
}

export enum PROMISE_STATUSES {
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

// vending machine coins
export const VENDING_MACHINE_COINS = [100, 50, 20, 10, 5];
