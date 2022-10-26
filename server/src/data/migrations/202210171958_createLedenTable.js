const { tables } = require('..');

module.exports = {
    up: async (knex) => {
      await knex.schema.createTable(tables.leden, (table) => {
        table.uuid("id").primary().notNullable();
        table.string("firstname").notNullable();
        table.string("lastname", 250).notNullable();
        table.string("tak", 250).notNullable();
        table.integer('aanwezig').defaultTo(0);
      });
    },
    down: async (knex) => {
      //return knex.schema.dropTableIfExists(tables.leden);
    },
  };