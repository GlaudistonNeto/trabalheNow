
exports.up = function(knex, Promise) {
  return knex.schema.createTable('portfolios', table => {
    table.increments('id').primary()
    table.string('description').notNull()
    table.string('imageUrl').notNull()
    table.integer('userId').references('id')
      .inTable('users')
    table.integer('articleId').references('id')
      .inTable('articles')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('portfolios')
};
