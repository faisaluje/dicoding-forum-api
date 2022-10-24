class CreateComment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.threadId = payload.threadId;
    this.content = payload.content;
    this.owner = payload.owner;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ threadId, content, owner }) {
    if (typeof threadId !== 'string' || typeof content !== 'string' || typeof owner !== 'string') {
      throw new Error('CREATE_COMMENT.NOT_MEET_TYPE_SPECIFICATION');
    }
  }
}

module.exports = CreateComment;
