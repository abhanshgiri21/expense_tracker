const Knex = require('knex');

/**
 *
 *
 * @param {Knex} knex
 */
exports.up = knex => {
  return knex.schema
    .table('expense', table => {
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
