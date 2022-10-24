const Jwt = require('@hapi/jwt');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const TokenPayload = require('../../../Domains/authentications/entities/TokenPayload');
const JwtTokenManager = require('../JwtTokenManager');

describe('JwtTokenManager', () => {
  describe('generateAccessToken function', () => {
    it('should generate token correctly', () => {
      // Arrange
      const payload = { id: 'user-123' };
      const spyJwtTokenGenerate = jest.spyOn(Jwt.token, 'generate');
      const jwtTokenManager = new JwtTokenManager();

      // Action
      const accessToken = jwtTokenManager.generateAccessToken(payload);

      // Assert
      expect(spyJwtTokenGenerate).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
      expect(typeof accessToken).toEqual('string');
    });
  });

  describe('generateRefreshToken function', () => {
    it('should generate token correctly', () => {
      // Arrange
      const payload = { id: 'user-123' };
      const spyJwtTokenGenerate = jest.spyOn(Jwt.token, 'generate');
      const jwtTokenManager = new JwtTokenManager();

      // Action
      const accessToken = jwtTokenManager.generateRefreshToken(payload);

      // Assert
      expect(spyJwtTokenGenerate).toBeCalledWith(payload, process.env.REFRESH_TOKEN_KEY);
      expect(typeof accessToken).toEqual('string');
    });
  });

  describe('verifyRefreshToken function', () => {
    it('should throw InvariantError when given invalid refreshToken', () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager();

      // Action & Assert
      expect(() => jwtTokenManager.verifyRefreshToken('xxx')).toThrowError(InvariantError);
    });

    it('should verify refresh token correctly', () => {
      // Arrange
      const tokenPayload = { id: 'user-123' };
      const jwtTokenManager = new JwtTokenManager();
      const validToken = jwtTokenManager.generateRefreshToken(tokenPayload);
      const spyJwtDecode = jest.spyOn(Jwt.token, 'decode');
      const spyJwtVerifySignature = jest.spyOn(Jwt.token, 'verifySignature');

      // Action & Assert
      expect(() => jwtTokenManager.verifyRefreshToken(validToken)).not.toThrowError();
      expect(spyJwtDecode).toBeCalledWith(validToken);
      expect(spyJwtVerifySignature).toBeCalled();
      expect(jwtTokenManager.verifyRefreshToken(validToken)).toBeInstanceOf(TokenPayload);
    });
  });
});
