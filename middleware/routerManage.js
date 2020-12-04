/**
 * @description 路由统一管理 middleware
 */
const Router = require('koa-router');
const requireDirectory = require('require-directory');

class RouterManage {
    constructor (app, path = 'src/controller') {
        this.path = `${process.cwd()}/${path}`;
        this.useRouter(app);
    }

    useRouter (app) {
        requireDirectory(module, this.path, {
            visit: (router) => {
                if (router instanceof Router) {
                    app.use(router.routes(), router.allowedMethods());
                }
            }
        })
    }
}

module.exports = RouterManage;