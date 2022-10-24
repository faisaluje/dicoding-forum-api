const Authentication = require('../Authentication');

describe('a Authentication entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'faisaluje',
    };

    // Action & Assert
    expect(() => new Authentication(payload)).toThrowError('AUTHENTICATION.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      username: 123,
      password: {},
    };

    // Action & Assert
    expect(() => new Authentication(payload)).toThrowError('AUTHENTICATION.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create authentication object correctly', () => {
    // Arrange
    const payload = {
      username: 'faisaluje',
      password: 'secret',
    };

    // Action
    const { username, password } = new Authentication(payload);

    // Assert
    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});
