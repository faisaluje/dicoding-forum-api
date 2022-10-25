class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const { addThreadUseCase } = this._container;
    const { id: credentialId } = request.auth.credentials;

    const addedThread = await addThreadUseCase.execute(credentialId, request.payload);

    return h.response({
      status: 'success',
      data: { addedThread },
    }).code(201);
  }

  async getThreadHandler(request) {
    const { getThreadDetailUseCase } = this._container;
    const { threadId } = request.params;

    const thread = await getThreadDetailUseCase.execute(threadId);

    return {
      status: 'success',
      data: { thread },
    };
  }
}

module.exports = ThreadsHandler;
