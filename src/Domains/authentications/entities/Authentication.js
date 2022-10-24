class Authentication {
  constructor(payload) {
    this._verifyPayload(payload);

    this.username = payload.username;
    this.password = payload.password;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ username, password }) {
    if (!username || !password) {
      throw new Error('AUTHENTICATION.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('AUTHENTICATION.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Authentication;
