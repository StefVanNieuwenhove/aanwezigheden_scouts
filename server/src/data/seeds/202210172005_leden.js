const { tables } = require('..');
const data = require('../db-data');

module.exports = {
    seed: async (knex) => {
      //await knex(tables.leden).delete();
      //await knex(tables.leden).insert(data.LEDEN);
    },
  };