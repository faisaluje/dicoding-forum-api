const TokenPayload = require('../TokenPayload');

describe('A TokenPayload entities', () => {
  it('should throw error when provide invalid payload', () => {
    // Arrange
    const payload = { username: 'aep' };

    // Action & Assert
    expect(() => new TokenPayload(payload)).toThrowError('TOKEN_PAYLOAD.INVALID_PAYLOAD');
  });

  it('should create token payload object correctly', () => {
    // Arrange
    const payload = { id: 'user-123' };

    // Action
    const { id } = new TokenPayload(payload);

    // Assert
    expect(id).toEqual(payload.id);
  });
});
