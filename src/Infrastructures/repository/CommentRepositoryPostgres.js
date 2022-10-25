const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/CommentRepository');

class CommentReopsitoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment({ threadId, content, owner }) {
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id, content, owner',
      values: [id, threadId, content, owner],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async verifyComment(commentId) {
    const query = {
      text: 'SELECT owner FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Komentar tidak ditemukan');
    }

    return result.rows[0];
  }

  async deleteComment(commentId) {
    const query = {
      text: 'UPDATE comments SET is_deleted = 1 WHERE id = $1 RETURNING id',
      values: [commentId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Gagal menghapus komentar, id tidak ditemukan');
    }
  }

  async getComments(threadId) {
    const query = {
      text: `SELECT comments.id, users.username, comments.date, comments.content, comments.is_deleted
      FROM comments 
      JOIN users on users.id = comments.owner
      WHERE comments.thread_id = $1
      ORDER BY comments.date`,
      values: [threadId],
    };
    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = CommentReopsitoryPostgres;
