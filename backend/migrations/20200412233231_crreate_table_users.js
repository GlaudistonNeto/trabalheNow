
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('name').notNull()
    table.string('surname').notNull()
    table.string('state').notNull()
    table.string('city').notNull()
    table.string('neighborhood').notNull()
    table.string('email').notNull().unique()
    table.string('password').notNull()
    table.string('portfolio', 1000).notNull()
    table.boolean('emplyer').notNull().defaultTo(false)
    table.boolean('admin').notNull().defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};