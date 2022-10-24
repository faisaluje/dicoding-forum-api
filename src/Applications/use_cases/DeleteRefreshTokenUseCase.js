class DeleteRefreshTokenUseCase {
  constructor({ authenticationRepository }) {
    this._authenticationRepository = authenticationRepository;
  }

  async execute(refreshToken) {
    this._validateRefreshToken(refreshToken);

    await this._authenticationRepository.deleteToken(refreshToken);
  }

  // eslint-disable-next-line class-methods-use-this
  _validateRefreshToken(refreshToken) {
    if (typeof refreshToken !== 'string') {
      throw new Error('DELETE_REFRESH_TOKEN_USE_CASE.INVALID_REFRESH_TOKEN');
    }
  }
}

module.exports = DeleteRefreshTokenUseCase;
