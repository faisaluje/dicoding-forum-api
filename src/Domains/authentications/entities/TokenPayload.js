class TokenPayload {
  constructor({ id }) {
    if (typeof id !== 'string') {
      throw new Error('TOKEN_PAYLOAD.INVALID_PAYLOAD');
    }

    this.id = id;
  }
}

module.exports = TokenPayload;
