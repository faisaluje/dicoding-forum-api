const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const CreateComment = require('../../../Domains/comments/entities/CreateComment');
const CreatedComment = require('../../../Domains/comments/entities/CreatedComment');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

describe('CommentReopsitoryPostgres', () => {
  const userId = 'user-okey';
  const threadId = 'thread-abc';

  beforeAll(async () => {
    await UsersTableTestHelper.addUser({ id: userId });
    await ThreadsTableTestHelper.addThread({ id: threadId, owner: userId });
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persis create comment', async () => {
      // Arrange
      const createComment = new CreateComment({
        threadId,
        content: 'PERTAMAX',
        owner: userId,
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await commentRepositoryPostgres.addComment(createComment);

      // Assert
      const comments = await CommentsTableTestHelper.findCommentsById('comment-123');
      expect(comments).toHaveLength(1);
    });

    it('should return created comment correctly', async () => {
      // Arrange
      const createComment = new CreateComment({
        threadId,
        content: 'PERTAMAX',
        owner: userId,
      });

      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const createdComment = await commentRepositoryPostgres.addComment(createComment);

      // Assert
      expect(createdComment).toStrictEqual(new CreatedComment({
        id: 'comment-123',
        content: 'PERTAMAX',
        owner: userId,
      }));
    });
  });

  describe('verifyComment function', () => {
    it('should throw NotFoundError when comment not found', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(() => commentRepositoryPostgres.verifyComment('comment-xyz')).rejects.toThrow(NotFoundError);
    });

    it('should not throw error when comment found', async () => {
      // Arrange
      await CommentsTableTestHelper.addComent({ threadId, id: 'comment-oke', owner: userId });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(() => commentRepositoryPostgres.verifyComment('comment-oke')).not.toThrow();
    });
  });

  describe('deleteComment function', () => {
    it('should throw InvariantError when comment not found', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(() => commentRepositoryPostgres.deleteComment('comment-xyz')).rejects.toThrow(InvariantError);
    });

    it('should not throw error when comment found', async () => {
      // Arrange
      await CommentsTableTestHelper.addComent({ threadId, id: 'comment-oke', owner: userId });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(() => commentRepositoryPostgres.deleteComment('comment-oke')).not.toThrow();
    });
  });
});
