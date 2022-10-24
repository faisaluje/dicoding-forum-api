const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const DeleteRefreshTokenUseCase = require('../DeleteRefreshTokenUseCase');

describe('DeleteRefreshTokenUseCase', () => {
  it('should throw error when provide invalid refreshToken', async () => {
    // Arrange
    const refreshToken = 123;
    const deleteRefreshTokenUseCase = new DeleteRefreshTokenUseCase({});

    // Action & Assert
    await expect(() => deleteRefreshTokenUseCase.execute(refreshToken)).rejects.toThrowError('DELETE_REFRESH_TOKEN_USE_CASE.INVALID_REFRESH_TOKEN');
  });

  it('should orchestrating the delete refresh token correctly', async () => {
    // Arrange
    const refreshToken = 'zz-zz';

    /** creating dependencies of use case  */
    const mockAuthenticationRepository = new AuthenticationRepository();

    /** mocking needed function  */
    mockAuthenticationRepository.deleteToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const deleteRefreshTokenUseCase = new DeleteRefreshTokenUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });

    // Action
    await deleteRefreshTokenUseCase.execute(refreshToken);

    // Assert
    expect(mockAuthenticationRepository.deleteToken).toBeCalledWith(refreshToken);
  });
});
