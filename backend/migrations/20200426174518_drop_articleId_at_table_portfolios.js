
exports.up = function(knex, Promise) {
  return knex.schema.table('portfolios', table => {
    table.dropColumn('articleId')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('portfolios', table => {
    table.integer('articleId')
  })
};
