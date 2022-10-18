const uuid = require("uuid");
const { tables, getKnex } = require("../data/index");
const { getChildLogger } = require("../core/logging");

const findAll = async () => {
    return getKnex()(tables.leden).select();
};

const findById = async (id) => {
    return getKnex()(tables.leden).select().where('id', id);
};

const findBytak = async (tak) => {
    return getKnex()(tables.leden).select().where('tak', tak);
};

const create = async ({firstname, lastname, tak}) => {
    try {
        const id = uuid.v4();
        await getKnex()(tables.leden).insert({
            id, 
            firstname, 
            lastname, 
            tak, 
            aanwezig: 0,
        });
        return findById(id);
    } catch (error) {
        const logger = getChildLogger('leden-repo');
        logger.error('Error in create', {error});
        throw error;
    }
};

const updateAanwezigheid = async (id, {firstname, lastname, tak}) => {
    try {
        const count = await getKnex()(tables.leden).where('id', id).select('aanwezig');
        await getKnex()(tables.leden).where('id', id).update({
            firstname, 
            lastname, 
            tak, 
            aanwezig: count += 1,
        });
        return findById(id);
    } catch (error) {
        const logger = getChildLogger('leden-repo');
        logger.error('Error in updateAanwezigheid', {error});
        throw error;
    }
};

const deleteById = async (id) => {
    try {
        await getKnex()(tables.leden).where('id', id).delete();
    } catch (error) {
        const logger = getChildLogger('leden-repo');
        logger.error('Error in deleteById', {error});
        throw error;
    }
};

module.exports = {
    findAll,
    findById,
    findBytak,
    create,
    updateAanwezigheid,
    deleteById,
}