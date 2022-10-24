const PasswordHelper = require('../PasswordHelper');

describe('PasswordHelper interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const passwordHelper = new PasswordHelper();

    // Action & Assert
    await expect(passwordHelper.hash('dummy_password')).rejects.toThrowError('PASSWORD_HELPER.METHOD_NOT_IMPLEMENTED');
    await expect(passwordHelper.verify('plain', 'encrypted')).rejects.toThrowError('PASSWORD_HELPER.METHOD_NOT_IMPLEMENTED');
  });
});
