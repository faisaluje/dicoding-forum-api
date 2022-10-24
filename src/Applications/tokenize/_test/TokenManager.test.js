const TokenManager = require('../TokenManager');

describe('Token interface', () => {
  it('should throw error when invoke abctract behavior', () => {
    // Arrange
    const tokenManager = new TokenManager();
    const payload = { id: 'user-123' };

    // Action & Assert
    expect(() => tokenManager.generateAccessToken(payload)).toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    expect(() => tokenManager.generateRefreshToken(payload)).toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    expect(() => tokenManager.verifyRefreshToken('zz-zz')).toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  });
});
