
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table.integer('portfolioId').references('id')
      .inTable('users')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('portfolioId')
  })
};
