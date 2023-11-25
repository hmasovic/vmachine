export class ActiveSessionExists extends Error {
  constructor(message = 'A session is active already!') {
    super(message);
  }
}
