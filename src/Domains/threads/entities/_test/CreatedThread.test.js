const CreatedThread = require('../CreatedThread');

describe('a CreatedThread entities', () => {
  it('should throw error when payload not meet type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      title: ['judl'],
      owner: undefined,
    };

    // Action & Assert
    expect(() => new CreatedThread(payload)).toThrowError('CREATED_THREAD.NOT_MEET_TYPE_SPECIFICATION');
  });

  it('should create createdThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'judul',
      owner: 'user-123',
    };

    // Action
    const createdThread = new CreatedThread(payload);

    // Assert
    expect(createdThread).toMatchObject(payload);
  });
});
