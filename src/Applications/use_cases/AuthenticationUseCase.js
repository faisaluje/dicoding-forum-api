const Authenticated = require('../../Domains/authentications/entities/Authenticated');
const Authentication = require('../../Domains/authentications/entities/Authentication');
const TokenPayload = require('../../Domains/authentications/entities/TokenPayload');

class AuthenticationUseCase {
  constructor({
    userRepository, passwordHelper, tokenManager, authenticationRepository,
  }) {
    this._userRepository = userRepository;
    this._passwordHelper = passwordHelper;
    this._tokenManager = tokenManager;
    this._authenticationRepository = authenticationRepository;
  }

  async execute(useCasePayload) {
    const authentication = new Authentication(useCasePayload);
    const userCredential = await this._userRepository.getUserCredential(authentication.username);

    await this._passwordHelper.verify(authentication.password, userCredential.password);

    const tokenPayload = new TokenPayload({ id: userCredential.id });
    const accessToken = this._tokenManager.generateAccessToken(tokenPayload);
    const refreshToken = this._tokenManager.generateRefreshToken(tokenPayload);
    const authenticated = new Authenticated({ accessToken, refreshToken });

    await this._authenticationRepository.addToken(refreshToken);

    return authenticated;
  }
}

module.exports = AuthenticationUseCase;
