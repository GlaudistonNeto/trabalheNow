
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table.string('state')
    table.string('city')
    table.string('neighborhood')
    table.string('phone')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('state')
    table.dropColumn('city')
    table.dropColumn('neighborhood')
    table.dropColumn('phone')
  })
};
