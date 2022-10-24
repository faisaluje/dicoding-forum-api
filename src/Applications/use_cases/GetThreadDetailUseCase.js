const ThreadDetail = require('../../Domains/threads/entities/ThreadDetail');

class GetThreadDetailUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(threadId) {
    this._validateThreadId(threadId);

    const threadDetail = await this._threadRepository.getThreadById(threadId);
    const comments = await this._commentRepository.getComments(threadId);

    return new ThreadDetail({
      ...threadDetail,
      comments,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _validateThreadId(threadId) {
    if (typeof threadId !== 'string') {
      throw new Error('GET_THREAD_DETAIL_USE_CASE.INVALID_THREAD_ID');
    }
  }
}

module.exports = GetThreadDetailUseCase;
