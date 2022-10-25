const CommentRepository = require('../../../Domains/comments/CommentRepository');
const CreateComment = require('../../../Domains/comments/entities/CreateComment');
const CreatedComment = require('../../../Domains/comments/entities/CreatedComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentsUseCase = require('../CommentsUseCase');

describe('CommentsUseCase', () => {
  describe('addComment function', () => {
    it('should orchestrating the add comment action correctly', async () => {
      // Arrange
      const useCasePayload = {
        threadId: 'thread-123',
        content: 'Pertamax GAN!',
        owner: 'user-123',
      };
      const expectedCreatedComment = new CreatedComment({
        id: 'comment-123',
        content: 'Pertamax GAN!',
        owner: 'user-123',
      });

      /** creating dependency of use case */
      const mockThreadRepository = new ThreadRepository();
      const mockCommentRepository = new CommentRepository();

      /** mocking needed function */
      mockThreadRepository.verifyThread = jest.fn()
        .mockImplementation(() => Promise.resolve());
      mockCommentRepository.addComment = jest.fn()
        .mockImplementation(() => Promise.resolve({
          id: 'comment-123',
          content: 'Pertamax GAN!',
          owner: 'user-123',
        }));

      /** creating use case instance */
      const commentsUseCase = new CommentsUseCase({
        threadRepository: mockThreadRepository,
        commentRepository: mockCommentRepository,
      });

      // Action
      const createdComment = await commentsUseCase.addComment(useCasePayload);

      // Assert
      expect(createdComment).toStrictEqual(expectedCreatedComment);
      expect(mockThreadRepository.verifyThread).toBeCalledWith('thread-123');
      expect(mockCommentRepository.addComment).toBeCalledWith(new CreateComment({
        threadId: 'thread-123',
        content: 'Pertamax GAN!',
        owner: 'user-123',
      }));
    });
  });

  describe('deleteComment function', () => {
    it('should throw error when delete comment not belong to user', async () => {
      // Arrange
      const useCasePayload = {
        userId: 'user-123',
        commentId: 'comment-123',
      };

      /** creating dependency of use case */
      const mockCommentRepository = new CommentRepository();

      /** mocking needed function */
      mockCommentRepository.verifyComment = jest.fn()
        .mockImplementation(() => Promise.resolve({ owner: 'user-abc' }));

      /** creating use case instance */
      const commentsUseCase = new CommentsUseCase({
        commentRepository: mockCommentRepository,
      });

      // Action & Assert
      await expect(() => commentsUseCase.deleteComment(useCasePayload)).rejects.toThrowError('DELETE_COMMENT_USE_CASE.NOT_COMMENT_OWNER');
      expect(mockCommentRepository.verifyComment).toBeCalledWith('comment-123');
    });

    it('should orchestrating the delete comment action correctly', async () => {
      // Arrange
      const useCasePayload = {
        userId: 'user-123',
        commentId: 'comment-123',
      };

      /** creating dependency of use case */
      const mockCommentRepository = new CommentRepository();

      /** mocking needed function */
      mockCommentRepository.verifyComment = jest.fn()
        .mockImplementation(() => Promise.resolve({ owner: 'user-123' }));
      mockCommentRepository.deleteComment = jest.fn()
        .mockImplementation(() => Promise.resolve());

      /** creating use case instance */
      const commentsUseCase = new CommentsUseCase({
        commentRepository: mockCommentRepository,
      });

      // Action
      await commentsUseCase.deleteComment(useCasePayload);

      // Assert
      expect(mockCommentRepository.verifyComment).toBeCalledWith('comment-123');
      expect(mockCommentRepository.deleteComment).toBeCalledWith('comment-123');
    });
  });
});
