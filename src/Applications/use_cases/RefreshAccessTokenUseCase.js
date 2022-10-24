class RefreshAccessTokenUseCase {
  constructor({ authenticationRepository, tokenManager }) {
    this._authenticationRepository = authenticationRepository;
    this._tokenManager = tokenManager;
  }

  async execute(refreshToken) {
    this._validateRefreshToken(refreshToken);

    await this._authenticationRepository.verifyToken(refreshToken);
    const tokenPayload = await this._tokenManager.verifyRefreshToken(refreshToken);

    return this._tokenManager.generateAccessToken(tokenPayload);
  }

  // eslint-disable-next-line class-methods-use-this
  _validateRefreshToken(refreshToken) {
    if (typeof refreshToken !== 'string') {
      throw new Error('REFRESH_ACCESS_TOKEN_USE_CASE.INVALID_REFRESH_TOKEN');
    }
  }
}

module.exports = RefreshAccessTokenUseCase;
