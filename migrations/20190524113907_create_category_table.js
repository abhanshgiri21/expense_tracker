exports.up = knex => {
  return knex.schema.createTable('category', table => {
    table.increments('id').primary();
    table
      .integer('parentId')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('category')
      .onDelete('CASCADE');
    table
      .string('name')
      .notNullable();
    table
      .string('slug')
      .notNullable();
    table
      .integer('treeId')
      .unsigned();
    table
      .integer('level')
      .unsigned();
    table.timestamps(false, true);
  })
};

exports.down = knex => {

};
