
exports.up = function(knex, Promise) {
  return knex.schema.createTable('portfolios', table => {    
    table.increments('id').primary()
    table.string('imageUrl', 1000)
    table.integer('userId').references('id')
        .inTable('users').notNull()
    table.integer('categoryId').references('id')
        .inTable('categories').notNull()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('portfolios');
};
