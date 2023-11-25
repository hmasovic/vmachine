export class UserNotUpdated extends Error {
  constructor(message = 'User not updated!') {
    super(message);
  }
}
