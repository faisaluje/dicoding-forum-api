class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const { addUserUseCase } = this._container;
    const addedUser = await addUserUseCase.execute(request.payload);

    return h.response({
      status: 'success',
      data: { addedUser },
    }).code(201);
  }
}

module.exports = UsersHandler;
