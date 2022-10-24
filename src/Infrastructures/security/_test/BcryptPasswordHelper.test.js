const bcrypt = require('bcrypt');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');
const BcryptPasswordHelper = require('../BcryptPasswordHelper');

describe('BcryptPasswordHelper', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptPasswordHash = new BcryptPasswordHelper(bcrypt);

      // Action
      const encryptedPassword = await bcryptPasswordHash.hash('plain_password');

      // Assert
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('plain_password');
      expect(spyHash).toBeCalledWith('plain_password', 10); // 10 adalah nilai saltRound default untuk BcryptPasswordHash
    });
  });

  describe('verify function', () => {
    const encryptedPassword = '$2b$10$2NZFT/0vam9PFRn7v6p1LeBbmHYVz8Z4AjA1jpOlzQF8CfGzYELe2';

    it('should thrown AuthenticationError when password not match', async () => {
      // Arrange
      const spyCompare = jest.spyOn(bcrypt, 'compare');
      const bcryptPasswordHelper = new BcryptPasswordHelper(bcrypt);

      // Action & Assert
      await expect(() => bcryptPasswordHelper.verify('pass', encryptedPassword)).rejects.toThrowError(AuthenticationError);
      expect(spyCompare).toBeCalledWith('pass', encryptedPassword);
    });

    it('should not thrown error when given valid password', async () => {
      // Arrange
      const spyCompare = jest.spyOn(bcrypt, 'compare');
      const bcryptPasswordHash = new BcryptPasswordHelper(bcrypt);

      // Action
      await bcryptPasswordHash.verify('secret', encryptedPassword);

      // Assert
      expect(spyCompare).toBeCalledWith('secret', encryptedPassword);
    });
  });
});
