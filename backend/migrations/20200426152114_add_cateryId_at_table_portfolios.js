
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('portfolios', table => {
  table.integer('categoryId').references('id')
    .inTable('portfolios')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('portfolios', table => {
    table.dropColumn('categoryId')
  })
};
