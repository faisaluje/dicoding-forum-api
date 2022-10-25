const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const Authenticated = require('../../../Domains/authentications/entities/Authenticated');
const Authentication = require('../../../Domains/authentications/entities/Authentication');
const UserCredential = require('../../../Domains/users/entities/UserCredential');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordHelper = require('../../security/PasswordHelper');
const TokenManager = require('../../tokenize/TokenManager');
const AuthenticationUseCase = require('../AuthenticationUseCase');

describe('AuthenticationUseCase', () => {
  it('should orchestrating the authentication action correctly', async () => {
    // Arrange
    const useCasePayload = new Authentication({
      username: 'faisaluje',
      password: 'secret',
    });
    const expectedAuthenticated = new Authenticated({
      accessToken: 'xx-xx',
      refreshToken: 'zz-zz',
    });
    const expectedUserCredential = new UserCredential({ id: 'user-xxx', username: 'faisaluje', password: 'encrypted_password' });
    const tokenPayload = { id: 'user-xxx' };

    /** creating dependency of use case */
    const mockUserRepository = new UserRepository();
    const mockPasswordHelper = new PasswordHelper();
    const mockTokenManager = new TokenManager();
    const mockAuthenticationRepository = new AuthenticationRepository();

    /** mocking needed function */
    mockUserRepository.getUserCredential = jest.fn()
      .mockImplementation(() => Promise.resolve({ id: 'user-xxx', username: 'faisaluje', password: 'encrypted_password' }));
    mockPasswordHelper.verify = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.generateAccessToken = jest.fn()
      .mockImplementation(() => 'xx-xx');
    mockTokenManager.generateRefreshToken = jest.fn()
      .mockImplementation(() => 'zz-zz');
    mockAuthenticationRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const authenticationUseCase = new AuthenticationUseCase({
      userRepository: mockUserRepository,
      passwordHelper: mockPasswordHelper,
      tokenManager: mockTokenManager,
      authenticationRepository: mockAuthenticationRepository,
    });

    // Action
    const authenticated = await authenticationUseCase.execute(useCasePayload);

    // Assert
    expect(mockUserRepository.getUserCredential).toBeCalledWith(useCasePayload.username);
    expect(mockPasswordHelper.verify)
      .toBeCalledWith(useCasePayload.password, expectedUserCredential.password);
    expect(mockTokenManager.generateAccessToken).toBeCalledWith(tokenPayload);
    expect(mockTokenManager.generateRefreshToken).toBeCalledWith(tokenPayload);
    expect(mockAuthenticationRepository.addToken)
      .toBeCalledWith(expectedAuthenticated.refreshToken);
    expect(authenticated).toStrictEqual(expectedAuthenticated);
  });
});
