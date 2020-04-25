
exports.up = function(knex, Promise) {
  
  return knex.schema.alterTable('users', table => {
    table.boolean('worker')
    table.boolean('employer')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('worker')
    table.dropColumn('employer')
  })
};
