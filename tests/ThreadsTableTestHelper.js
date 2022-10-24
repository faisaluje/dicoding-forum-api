/* istanbul ignore file */

const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async findThreadsById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE threads CASCADE');
  },

  async addThread({
    id = 'thread-123', title = 'Dicoding', body = 'Thread dicoding', owner = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, title, body, owner],
    };

    const result = await pool.query(query);

    return result.rows[0];
  },
};

module.exports = ThreadsTableTestHelper;
