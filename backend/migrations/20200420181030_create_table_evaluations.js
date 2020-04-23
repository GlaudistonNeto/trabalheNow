
exports.up = function(knex, Promise) {
  return knex.schema.createTable('evaluations', table => {
    table.increments('id').primary()
    table.integer('articleId').references('id')
        .inTable('articles').notNull()
    table.integer('grade', 1)
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('evaluations');
};
