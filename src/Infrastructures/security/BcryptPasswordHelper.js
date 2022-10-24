const PasswordHelper = require('../../Applications/security/PasswordHelper');
const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');

class BcryptPasswordHelper extends PasswordHelper {
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }

  async verify(plain, encrypted) {
    const match = await this._bcrypt.compare(plain, encrypted);
    if (!match) {
      throw new AuthenticationError('Kredensial yang anda berikan salah');
    }
  }
}

module.exports = BcryptPasswordHelper;
