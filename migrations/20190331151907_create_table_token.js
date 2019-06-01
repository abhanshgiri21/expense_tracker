exports.up = knex => {
    return knex.schema.createTable('auth_token', table => {
        table.increments();
        table
            .integer('userId')
            .unsigned()
            .references('id')
            .inTable('user')
            .onDelete('cascade');
        table.string('token').notNullable();
        table.timestamps(false, true);
    })
};

exports.down = knex => {

};
