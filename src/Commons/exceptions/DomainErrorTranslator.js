const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'AUTHENTICATION.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Kredensial yang anda berikan salah'),
  'AUTHENTICATION.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Kredensial yang anda berikan salah'),
  'CREATE_THREAD.NOT_MEET_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada'),
  'CREATE_THREAD.TITLE_LIMIT_CHAR': new InvariantError('tidak dapat membuat thread baru karena karakter title melebihi batas limit'),
};

module.exports = DomainErrorTranslator;
