const Router = require("@koa/router");
const ledenRouter = require('./_leden');

module.exports = (app) => {
    const router = new Router({
        prefix: '/api',
    });

    ledenRouter(router);

    app.use(router.routes());
    app.use(router.allowedMethods());
}