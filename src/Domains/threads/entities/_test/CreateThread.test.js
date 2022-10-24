const CreateThread = require('../CreateThread');

describe('a CreateThread entitites', () => {
  it('shoud throw error when payload did not meet type specification', () => {
    // Arrange
    const payload = {
      title: 11122,
      body: undefined,
      owner: ['user-123'],
    };

    // Action & Assert
    expect(() => new CreateThread(payload)).toThrowError('CREATE_THREAD.NOT_MEET_TYPE_SPECIFICATION');
  });

  it('shoud throw error when title contains more than 100 character', () => {
    // Arrange
    const payload = {
      title: 'Her breath exited her mouth in big puffs as if she were smoking a cigarette. The morning dew had made her clothes damp and she shivered from the chill in the air. There was only one thing that could get her up and out this early in the morning.',
      body: 'Thread pertamaku',
      owner: 'user-123',
    };

    // Action & Assert
    expect(() => new CreateThread(payload)).toThrowError('CREATE_THREAD.TITLE_LIMIT_CHAR');
  });

  it('should create createThread object correctly', () => {
    // Arrange
    const payload = {
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertamaku di forum ini',
      owner: 'user-123',
    };

    const createThread = new CreateThread(payload);

    // Action & Assert
    expect(createThread).toMatchObject(payload);
  });
});
