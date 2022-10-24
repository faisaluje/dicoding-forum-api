const RegisterUser = require('../../Domains/users/entities/RegisterUser');

class AddUserUseCase {
  constructor({ userRepository, passwordHelper }) {
    this._userRepository = userRepository;
    this._passwordHelper = passwordHelper;
  }

  async execute(useCasePayload) {
    const registerUser = new RegisterUser(useCasePayload);
    await this._userRepository.verifyAvailableUsername(registerUser.username);
    registerUser.password = await this._passwordHelper.hash(registerUser.password);

    return this._userRepository.addUser(registerUser);
  }
}

module.exports = AddUserUseCase;
