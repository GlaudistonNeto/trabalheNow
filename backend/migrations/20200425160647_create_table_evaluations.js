
exports.up = function(knex, Promise) {
  return knex.schema.createTable('evaluations', table => {
    table.increments('id').primary()
    table.integer('grade').notNull()
    table.integer('userId').references('id')
      .inTable('users')
    table.integer('articleId').references('id')
      .inTable('articles')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('evaluations')
};
