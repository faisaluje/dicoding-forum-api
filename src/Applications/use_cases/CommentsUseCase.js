const CreateComment = require('../../Domains/comments/entities/CreateComment');
const CreatedComment = require('../../Domains/comments/entities/CreatedComment');
const DeleteComment = require('../../Domains/comments/entities/DeleteComment');

class CommentsUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async addComment(owner, payload) {
    const createComment = new CreateComment({
      threadId: payload.threadId,
      content: payload.content,
      owner,
    });
    await this._threadRepository.verifyThread(createComment.threadId);

    const createdComment = await this._commentRepository.addComment(createComment);

    return new CreatedComment(createdComment);
  }

  async deleteComment(userId, commentId) {
    const deleteComent = new DeleteComment({ userId, commentId });
    const { owner } = await this._commentRepository.verifyComment(deleteComent.commentId);
    if (owner !== userId) {
      throw new Error('DELETE_COMMENT_USE_CASE.NOT_COMMENT_OWNER');
    }

    await this._commentRepository.deleteComment(commentId);
  }
}

module.exports = CommentsUseCase;
