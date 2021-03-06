exports.up = knex => {
  return knex.schema.createTable('expense', table => {
    table.increments('id').primary();
    table
      .integer('category_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('category')
      .onDelete('CASCADE');
    table
      .string('name')
      .notNullable();
    table
      .string('desc')
      .notNullable();
    table
      .integer('amount')
      .unsigned();
    table
      .text('tags')
      .unsigned();
    table.timestamps(false, true);
  })
};

exports.down = knex => {

};
