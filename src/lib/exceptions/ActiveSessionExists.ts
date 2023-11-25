export class ActiveSessionExists extends Error {
  constructor(message = 'A session is already active!') {
    super(message);
  }
}
