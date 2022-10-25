const ThreadDetail = require('../../Domains/threads/entities/ThreadDetail');
const Comment = require('../../Domains/comments/entities/Comment');

class GetThreadDetailUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(threadId) {
    this._validateThreadId(threadId);

    const thread = await this._threadRepository.getThreadById(threadId);
    const comments = await this._commentRepository.getComments(threadId);

    return new ThreadDetail({
      id: thread.id,
      title: thread.title,
      body: thread.body,
      date: new Date(thread.date).toISOString(),
      username: thread.username,
      comments: comments.map((comment) => new Comment({
        id: comment.id,
        username: comment.username,
        date: new Date(comment.date).toISOString(),
        content: comment.is_deleted ? '**komentar telah dihapus**' : comment.content,
      })),
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
