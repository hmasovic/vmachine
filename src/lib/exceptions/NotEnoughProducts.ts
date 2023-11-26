export class NotEnoughProducts extends Error {
  constructor(message: string) {
    super(message);
  }
}
