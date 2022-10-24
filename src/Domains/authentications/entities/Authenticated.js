class Authenticated {
  constructor(payload) {
    this._verifyPayload(payload);

    this.accessToken = payload.accessToken;
    this.refreshToken = payload.refreshToken;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ accessToken, refreshToken }) {
    if (!accessToken || !refreshToken) {
      throw new Error('AUTHENTICATED.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
      throw new Error('AUTHENTICATED.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Authenticated;
