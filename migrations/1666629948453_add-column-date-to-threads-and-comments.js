exports.up = (pgm) => {
  pgm.addColumn('threads', {
    date: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addColumn('comments', {
    date: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('threads', 'date');
  pgm.dropColumn('comments', 'date');
};
