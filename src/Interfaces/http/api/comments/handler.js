const CreateComment = require('../../../../Domains/comments/entities/CreateComment');
const DeleteComment = require('../../../../Domains/comments/entities/DeleteComment');

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    const { commentsUseCase } = this._container;
    const { threadId } = request.params;
    const { content } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    const createComment = new CreateComment({
      threadId,
      content,
      owner: credentialId,
    });
    const addedComment = await commentsUseCase.addComment(createComment);

    return h.response({
      status: 'success',
      data: { addedComment },
    }).code(201);
  }

  async deleteCommentHandler(request) {
    const { commentsUseCase } = this._container;
    const { commentId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const deleteComment = new DeleteComment({
      userId: credentialId,
      commentId,
    });

    await commentsUseCase.deleteComment(deleteComment);

    return {
      status: 'success',
    };
  }
}

module.exports = CommentsHandler;
