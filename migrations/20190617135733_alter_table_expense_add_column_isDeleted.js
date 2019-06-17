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
        .boolean('is_deleted')
        .unsigned()
        .defaultTo(false);
    })
};

exports.down = knex => {

};
