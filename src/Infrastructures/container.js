/* istanbul ignore file */

// external agency
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const pool = require('./database/postgres/pool');

// service (repository, helper, manager, etc)
const BcryptPasswordHelper = require('./security/BcryptPasswordHelper');
const JwtTokenManager = require('./tokenize/JwtTokenManager');
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres');
const ThreadRepositoryPostgres = require('./repository/ThreadRepositoryPostgres');

// use case
const AddUserUseCase = require('../Applications/use_cases/AddUserUseCase');
const AuthenticationUseCase = require('../Applications/use_cases/AuthenticationUseCase');
const RefreshAccessTokenUseCase = require('../Applications/use_cases/RefreshAccessTokenUseCase');
const DeleteRefreshTokenUseCase = require('../Applications/use_cases/DeleteRefreshTokenUseCase');
const AddThreadUseCase = require('../Applications/use_cases/AddThreadUseCase');

const passwordHelper = new BcryptPasswordHelper(bcrypt);
const tokenManager = new JwtTokenManager();
const userRepository = new UserRepositoryPostgres(pool, nanoid);
const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
const threadRepository = new ThreadRepositoryPostgres(pool, nanoid);

const serviceInstanceContainer = {
  passwordHelper,
  tokenManager,
  userRepository,
  authenticationRepository,
  threadRepository,
};

const useCaseInstanceContainer = {
  addUserUseCase: new AddUserUseCase({
    userRepository,
    passwordHelper,
  }),
  authenticationUseCase: new AuthenticationUseCase({
    userRepository,
    passwordHelper,
    tokenManager,
    authenticationRepository,
  }),
  refreshAccessTokenUseCase: new RefreshAccessTokenUseCase({
    authenticationRepository,
    tokenManager,
  }),
  deleteRefreshTokenUseCase: new DeleteRefreshTokenUseCase({
    authenticationRepository,
  }),
  addThreadUseCase: new AddThreadUseCase({
    threadRepository,
  }),
};

const container = {
  ...serviceInstanceContainer,
  ...useCaseInstanceContainer,
};

// export all instances
module.exports = container;
