class UserCredential {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.username = payload.username;
    this.password = payload.password;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ username, password, id }) {
    if (!username || !password || !id) {
      throw new Error('USER_CREDENTIAL.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string' || typeof id !== 'string') {
      throw new Error('USER_CREDENTIAL.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UserCredential;
