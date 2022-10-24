const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const pool = require('../../database/postgres/pool');
const AuthenticationRepositoryPostgres = require('../AuthenticationRepositoryPostgres');

describe('AuthenticationRepositoryPostgres', () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addToken function', () => {
    it('should persist token', async () => {
      // Arrange
      const token = 'token-123';
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool);

      // Action
      await authenticationRepositoryPostgres.addToken(token);

      // Assert
      const tokens = await AuthenticationsTableTestHelper.findToken(token);
      expect(tokens).toHaveLength(1);
    });
  });

  describe('verifyToken function', () => {
    it('should throw error when token not found', async () => {
      // Arrange
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool);

      // Action & Assert
      await expect(authenticationRepositoryPostgres.verifyToken('xxxx')).rejects.toThrow(InvariantError);
    });

    it('should not throw error when token found', async () => {
      // Arrange
      await AuthenticationsTableTestHelper.addToken('token-xxx');
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool);

      // Action & Assert
      await expect(authenticationRepositoryPostgres.verifyToken('token-xxx')).resolves.not.toThrowError();
    });
  });

  describe('deleteToken function', () => {
    it('should throw InvariantError when token not found', async () => {
      // Arrange
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool);

      // Action & Assert
      await expect(authenticationRepositoryPostgres.deleteToken('xxxx')).rejects.toThrow(InvariantError);
    });

    it('should delete token correctly', async () => {
      // Arrange
      await AuthenticationsTableTestHelper.addToken('token-xxx');
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool);

      // Action & Assert
      await expect(authenticationRepositoryPostgres.deleteToken('token-xxx')).resolves.not.toThrowError();
    });
  });
});
