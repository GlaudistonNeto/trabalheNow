
exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', table => {
    table.increments('id').primary()
    table.integer('jobId').references('id')
        .inTable('jobs').notNull()
    table.integer('userId').references('id')
            .inTable('users').notNull()
  })          
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobs')
};
