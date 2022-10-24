/* eslint-disable class-methods-use-this */
const Jwt = require('@hapi/jwt');
const TokenManager = require('../../Applications/tokenize/TokenManager');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const TokenPayload = require('../../Domains/authentications/entities/TokenPayload');

class JwtTokenManager extends TokenManager {
  generateAccessToken(payload) {
    return Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }

  generateRefreshToken(payload) {
    return Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }

  verifyRefreshToken(refreshToken) {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);

      return new TokenPayload(artifacts.decoded.payload);
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  }
}

module.exports = JwtTokenManager;
