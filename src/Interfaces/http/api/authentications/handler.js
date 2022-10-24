class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    const { authenticationUseCase } = this._container;
    const authenticated = await authenticationUseCase.execute(request.payload);

    return h.response({
      status: 'success',
      data: authenticated,
    }).code(201);
  }

  async putAuthenticationHandler(request) {
    const { refreshAccessTokenUseCase } = this._container;
    const accessToken = await refreshAccessTokenUseCase.execute(request.payload.refreshToken);

    return {
      status: 'success',
      data: { accessToken },
    };
  }

  async deleteAuthenticationHandler(request) {
    const { deleteRefreshTokenUseCase } = this._container;

    await deleteRefreshTokenUseCase.execute(request.payload.refreshToken);

    return {
      status: 'success',
      message: 'refresh token berhasil dihapus',
    };
  }
}

module.exports = AuthenticationsHandler;
