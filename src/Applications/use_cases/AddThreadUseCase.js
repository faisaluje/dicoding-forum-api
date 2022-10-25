const CreatedThread = require('../../Domains/threads/entities/CreatedThread');
const CreateThread = require('../../Domains/threads/entities/CreateThread');

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(owner, payload) {
    const createThread = new CreateThread({
      title: payload.title,
      body: payload.body,
      owner,
    });

    const createdThread = await this._threadRepository.addThread(createThread);

    return new CreatedThread(createdThread);
  }
}

module.exports = AddThreadUseCase;
