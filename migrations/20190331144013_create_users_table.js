exports.up = knex => {
    return knex.schema.createTable('user', table => {
        table.increments();
        table.string('username').notNullable();
        table.unique('username');
        table.string('password').notNullable();
        table.timestamps(false, true);
    })
};

exports.down = knex => {

};
