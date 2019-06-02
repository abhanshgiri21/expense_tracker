const Knex = require('knex');

/**
 *
 *
 * @param {Knex} knex
 */
exports.up = knex => {
  return knex.schema
    .table('category', table => {
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .nullable()
        .onDelete('CASCADE');
    })
};

exports.down = knex => {

};
