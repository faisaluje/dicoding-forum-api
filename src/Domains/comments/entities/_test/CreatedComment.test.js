const CreatedComment = require('../CreatedComment');

describe('a createdComment entities', () => {
  it('should throw error when payload not meet type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      content: ['content'],
      owner: undefined,
    };

    // Action & Assert
    expect(() => new CreatedComment(payload)).toThrowError('CREATED_COMMENT.NOT_MEET_TYPE_SPECIFICATION');
  });

  it('should create createdComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'Pertamax GAN!',
      owner: 'user-123',
    };

    // Action
    const createdComment = new CreatedComment(payload);

    // Assert
    expect(createdComment).toMatchObject(payload);
  });
});
