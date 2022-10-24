const CreateThread = require('../../../../Domains/threads/entities/CreateThread');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const { addThreadUseCase } = this._container;
    const { title, body } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    const createThread = new CreateThread({
      title,
      body,
      owner: credentialId,
    });

    const addedThread = await addThreadUseCase.execute(createThread);

    return h.response({
      status: 'success',
      data: { addedThread },
    }).code(201);
  }
}

module.exports = ThreadsHandler;