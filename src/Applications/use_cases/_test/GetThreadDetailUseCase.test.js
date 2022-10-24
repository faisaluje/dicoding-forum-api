const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadDetail = require('../../../Domains/threads/entities/ThreadDetail');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadDetailUseCase = require('../GetThreadDetailUseCase');

describe('GetThreadDetailUseCase', () => {
  it('should throw error when provide invalid threadId', async () => {
    // Arrange
    const threadId = 123;
    const getThreadDetailUseCase = new GetThreadDetailUseCase({
      threadRepository: {},
      commentRepository: {},
    });

    // Action & Assert
    await expect(() => getThreadDetailUseCase.execute(threadId)).rejects.toThrowError('GET_THREAD_DETAIL_USE_CASE.INVALID_THREAD_ID');
  });

  it('should orchestrating the get thread action correctly', async () => {
    // Arrange
    const threadId = 'thread-123';
    const expectedThreadDetail = new ThreadDetail({
      id: 'thread-123',
      title: 'judul',
      body: 'isi konten',
      date: new Date().toISOString(),
      username: 'john',
      comments: [],
    });

    /** creating dependencies of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needs function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve({
        id: expectedThreadDetail.id,
        title: expectedThreadDetail.title,
        body: expectedThreadDetail.body,
        date: expectedThreadDetail.date,
        username: expectedThreadDetail.username,
      }));
    mockCommentRepository.getComments = jest.fn()
      .mockImplementation(() => Promise.resolve([]));

    /** creating use case instance */
    const getThreadDetailUseCase = new GetThreadDetailUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const threadDetail = await getThreadDetailUseCase.execute(threadId);

    // Assert
    expect(threadDetail).toStrictEqual(expectedThreadDetail);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.getComments).toBeCalledWith(threadId);
  });
});
