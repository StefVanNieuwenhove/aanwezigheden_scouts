const config = require("config");
const { getChildLogger } = require("../core/logging");
const repository = require('../repository/leden');

const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getChildLogger("leden-service");
    this.logger.debug(message, meta);
};

const getAll = async () => {
    debugLog('Fetching all leden');
    return await repository.findAll();
};

const getById = async (id) => {
    debugLog('Fetching leden by id', {id});
    return await repository.findById(id);
};

const getByTak = async (tak) => {
    debugLog('Fetching leden by tak', {tak});
    return await repository.findBytak(tak);
};

const create = async ({firstname, lastname, tak}) => {
    debugLog('Creating leden', {firstname, lastname, tak});
    return await repository.create({firstname, lastname, tak});
};

const isAanwezig = async (id) => {
    debugLog('Updating leden', {id});
    return await repository.isAanwezig(id);
};

const nietAanwezig = async (id) => {
    debugLog('Updating leden', {id});
    return await repository.nietAanwezig(id);
};

const deleteById = async (id) => {
    debugLog('Deleting leden', {id});
    return await repository.deleteById(id);
};

module.exports = {
    getAll,
    getById,
    getByTak,
    create,
    isAanwezig,
    nietAanwezig,
    deleteById,
};
