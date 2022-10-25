const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');
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

    const registeredUser = await this._userRepository.addUser(registerUser);

    return new RegisteredUser(registeredUser);
  }
}

module.exports = AddUserUseCase;
