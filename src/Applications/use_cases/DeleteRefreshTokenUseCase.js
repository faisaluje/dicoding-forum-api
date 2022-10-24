class DeleteRefreshTokenUseCase {
  constructor({ authenticationRepository }) {
    this._authenticationRepository = authenticationRepository;
  }

  async execute(refreshToken) {
    if (typeof refreshToken !== 'string') {
      throw new Error('DELETE_REFRESH_TOKEN_USE_CASE.INVALID_REFRESH_TOKEN');
    }

    await this._authenticationRepository.deleteToken(refreshToken);
  }
}

module.exports = DeleteRefreshTokenUseCase;
