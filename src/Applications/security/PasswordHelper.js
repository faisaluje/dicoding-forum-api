/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class PasswordHelper {
  async hash(password) {
    throw new Error('PASSWORD_HELPER.METHOD_NOT_IMPLEMENTED');
  }

  async verify(plain, encrypted) {
    throw new Error('PASSWORD_HELPER.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = PasswordHelper;
