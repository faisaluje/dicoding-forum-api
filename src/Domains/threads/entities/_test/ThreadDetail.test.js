const ThreadDetail = require('../ThreadDetail');

describe('a ThreadDetail entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'asal',
      body: 'broh',
    };

    // Action and Assert
    expect(() => new ThreadDetail(payload)).toThrowError('THREAD_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      title: 'judul',
      body: 'kuy',
      date: true,
      username: {},
      comments: [],
    };

    // Action & Assert
    expect(() => new ThreadDetail(payload)).toThrowError('THREAD_DETAIL.NOT_MEET_TYPE_SPECIFICATION');
  });
});
