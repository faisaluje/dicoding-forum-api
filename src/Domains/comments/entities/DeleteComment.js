class DeleteComment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.userId = payload.userId;
    this.commentId = payload.commentId;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ userId, commentId }) {
    if (!userId || !commentId) {
      throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof userId !== 'string' || typeof commentId !== 'string') {
      throw new Error('DELETE_COMMENT.NOT_MEET_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteComment;
