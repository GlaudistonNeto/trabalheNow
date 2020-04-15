
exports.up = function(knex, Promise) {
  return knex.schema.createTable('portfolio', table => {
    table.increments('id').primary()
    table.string('work').notNull()
    table.string('description').notNull()
    table.integer('userId').references('id')
      .inTable('users').notNull()
    table.integer('evaluationId').references('id')
      .inTable('articles').notNull('workId')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('portfolio');
};
