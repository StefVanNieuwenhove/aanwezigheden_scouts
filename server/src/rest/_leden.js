const Router = require('@koa/router');
const service = require('../service/leden');

const getAll = async (ctx) => {
    ctx.body = await service.getAll();
};

const getById = async (ctx) => {
    ctx.body = await service.getById(ctx.params.id);
};

const getByTak = async (ctx) => {
    ctx.body = await service.getByTak(ctx.params.tak);
};

const create = async (ctx) => {
    const lid = await service.create(ctx.request.body);
    ctx.body = lid;
    ctx.status = 201;
};

const updateAanwezigheid = async (ctx) => {
    ctx.body = await service.updateAanwezigheid(ctx.params.id);
};

const remove = async (ctx) => {
    ctx.body = await service.deleteById(ctx.params.id);
    ctx.status = 204;
};

module.exports = (app) => {
    const router = new Router({
        prefix: '/leden',
    });

    router.get('/', getAll);
    router.get('/id/:id', getById);
    router.get('/:tak', getByTak);
    router.post('/', create);
    router.put('/:id', updateAanwezigheid);
    router.delete('/:id', remove);

    app.use(router.routes());
    app.use(router.allowedMethods());
};