/* istanbul ignore file */

const CommonsTestHelper = {
  async getAccessToken(server, payload = {
    username: 'dicoding',
    password: 'secret',
    fullname: 'Dicoding Indonesia',
  }) {
    await server.inject({
      method: 'POST',
      url: '/users',
      payload,
    });
    const authResponse = await server.inject({
      method: 'POST',
      url: '/authentications',
      payload: { username: payload.username, password: payload.password },
    });

    return JSON.parse(authResponse.payload).data.accessToken;
  },

  async postThread(server, accessToken, payload) {
    const response = await server.inject({
      method: 'POST',
      url: '/threads',
      payload,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return JSON.parse(response.payload).data.addedThread;
  },

  async postComment(server, accessToken, threadId, payload) {
    const response = await server.inject({
      method: 'POST',
      url: `/threads/${threadId}/comments`,
      payload,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return JSON.parse(response.payload).data.addedComment;
  },
};

module.exports = CommonsTestHelper;
