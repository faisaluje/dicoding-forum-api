const CreateComment = require('../CreateComment');

describe('a CreateComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      threadId: 123,
      content: 'isinya',
    };

    // Action and Assert
    expect(() => new CreateComment(payload)).toThrowError('CREATE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet type specification', () => {
    // Arrange
    const payload = {
      threadId: 123,
      content: 'isinya',
      owner: ['user-123'],
    };

    // Action & Assert
    expect(() => new CreateComment(payload)).toThrowError('CREATE_COMMENT.NOT_MEET_TYPE_SPECIFICATION');
  });

  it('should create createComment object correctly', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      content: 'Konten paling top',
      owner: 'user-123',
    };

    const createComment = new CreateComment(payload);

    // Action & Assert
    expect(createComment).toMatchObject(payload);
  });
});
