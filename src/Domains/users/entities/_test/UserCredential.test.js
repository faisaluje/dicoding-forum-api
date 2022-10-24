const UserCredential = require('../UserCredential');

describe('a UserCredential entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'abc',
      username: 'abc',
    };

    // Action and Assert
    expect(() => new UserCredential(payload)).toThrowError('USER_CREDENTIAL.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      username: true,
      password: 'abc',
    };

    // Action and Assert
    expect(() => new UserCredential(payload)).toThrowError('USER_CREDENTIAL.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should craete userCredential object correctly', () => {
    // Arrange
    const payload = {
      id: 'user-123',
      username: 'dicoding',
      password: 'secret',
    };

    // Action
    const { id, username, password } = new UserCredential(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});
