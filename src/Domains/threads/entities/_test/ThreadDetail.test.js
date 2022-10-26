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

  it('should create threadDetail object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'judul',
      body: 'kuy',
      date: new Date().toISOString(),
      username: 'john',
      comments: [],
    };

    // Action
    const {
      id, title, body, date, username, comments,
    } = new ThreadDetail(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
    expect(comments).toHaveLength(0);
  });
});
