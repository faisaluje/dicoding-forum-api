class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(createThread) {
    return this._threadRepository.addThread(createThread);
  }
}

module.exports = AddThreadUseCase;
