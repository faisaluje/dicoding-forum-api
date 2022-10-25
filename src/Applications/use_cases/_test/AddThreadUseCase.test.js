const CreatedThread = require('../../../Domains/threads/entities/CreatedThread');
const CreateThread = require('../../../Domains/threads/entities/CreateThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctyl', async () => {
    // Arrange
    const useCasePayload = {
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertamaku di forum tercinta ini',
    };
    const expectedCreatedThread = new CreatedThread({
      id: 'thread-123',
      title: 'Thread Pertama',
      owner: 'user-123',
    });

    /** creating dependency of use case  */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve({
        id: 'thread-123',
        title: 'Thread Pertama',
        owner: 'user-123',
      }));

    /** creating use case instance */
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const createdThread = await addThreadUseCase.execute('user-123', useCasePayload);

    // Assert
    expect(createdThread).toStrictEqual(expectedCreatedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(new CreateThread({
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertamaku di forum tercinta ini',
      owner: 'user-123',
    }));
  });
});
