const DeleteComment = require('../DeleteComment');

describe('a deleteComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      commentId: ['sss'],
    };

    // Action and Assert
    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet type specification', () => {
    // Arrange
    const payload = {
      userId: 123,
      commentId: ['sss'],
    };

    // Action & Assert1
    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_MEET_TYPE_SPECIFICATION');
  });

  it('should create deleteComment object correctly', () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      commentId: 'comment-123',
    };

    const deleteComment = new DeleteComment(payload);

    // Action & Assert
    expect(deleteComment).toMatchObject(payload);
  });
});
