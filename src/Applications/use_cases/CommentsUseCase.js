class CommentsUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async addComment(createComment) {
    await this._threadRepository.verifyThread(createComment.threadId);

    return this._commentRepository.addComment(createComment);
  }

  async deleteComment(deleteComment) {
    const { userId, commentId } = deleteComment;
    const { owner } = await this._commentRepository.verifyComment(commentId);
    if (owner !== userId) {
      throw new Error('DELETE_COMMENT_USE_CASE.NOT_COMMENT_OWNER');
    }

    await this._commentRepository.deleteComment(commentId);
  }
}

module.exports = CommentsUseCase;
