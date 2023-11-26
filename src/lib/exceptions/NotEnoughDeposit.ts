export class NotEnoughDeposit extends Error {
  constructor(message: string) {
    super(message);
  }
}
