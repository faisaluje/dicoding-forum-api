const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const TokenManager = require('../../tokenize/TokenManager');
const RefreshAccessTokenUseCase = require('../RefreshAccessTokenUseCase');

describe('RefreshAccessTokenUseCase', () => {
  it('should throw error when provide invalid refreshToken', async () => {
    // Arrange
    const refreshToken = 123;
    const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase({}, {});

    // Action & Assert
    await expect(() => refreshAccessTokenUseCase.execute(refreshToken)).rejects.toThrowError('REFRESH_ACCESS_TOKEN_USE_CASE.INVALID_REFRESH_TOKEN');
  });

  it('should orchestrating the refresh access token correctly', async () => {
    // Arrange
    const refreshToken = 'zz-zz';
    const expectedAccessToken = 'xx-xx';
    const verifyRefreshTokenResult = { id: 'user-123' };

    /** creating dependencies of use case */
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockTokenManager = new TokenManager();

    /** mocking needed function */
    mockAuthenticationRepository.verifyToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => verifyRefreshTokenResult);
    mockTokenManager.generateAccessToken = jest.fn()
      .mockImplementation(() => 'xx-xx');

    /** creating use case instance  */
    const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase({
      authenticationRepository: mockAuthenticationRepository,
      tokenManager: mockTokenManager,
    });

    // Action
    const accessToken = await refreshAccessTokenUseCase.execute(refreshToken);

    // Assert
    expect(mockAuthenticationRepository.verifyToken).toBeCalledWith(refreshToken);
    expect(mockTokenManager.verifyRefreshToken).toBeCalledWith(refreshToken);
    expect(mockTokenManager.generateAccessToken).toBeCalledWith(verifyRefreshTokenResult);
    expect(accessToken).toEqual(expectedAccessToken);
  });
});
