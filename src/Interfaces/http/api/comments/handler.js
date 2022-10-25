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

    const addedComment = await commentsUseCase.addComment(credentialId, { threadId, content });

    return h.response({
      status: 'success',
      data: { addedComment },
    }).code(201);
  }

  async deleteCommentHandler(request) {
    const { commentsUseCase } = this._container;
    const { commentId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await commentsUseCase.deleteComment(credentialId, commentId);

    return {
      status: 'success',
    };
  }
}

module.exports = CommentsHandler;
