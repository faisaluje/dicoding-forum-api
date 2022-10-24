const Authenticated = require('../Authenticated');

describe('a Authenticated entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      accessToken: '123-xxx',
    };

    // Action & Assert
    expect(() => new Authenticated(payload)).toThrowError('AUTHENTICATED.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      accessToken: ['123-xxx'],
      refreshToken: 123,
    };

    // Action & Assert
    expect(() => new Authenticated(payload)).toThrowError('AUTHENTICATED.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create authenticated object correctly', () => {
    // Arrange
    const payload = {
      accessToken: '123-xxx',
      refreshToken: 'sdfsfji0ef-skldfsjf',
    };

    // Action
    const authenticated = new Authenticated(payload);

    expect(authenticated.accessToken).toEqual(payload.accessToken);
    expect(authenticated.refreshToken).toEqual(payload.refreshToken);
  });
});
