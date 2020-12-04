/**
 * @description user controller
 */
const router = require('koa-router')();
const isLogin = require('../../middleware/isLogin');
const validate = require('../../middleware/validate');
const jsonFormat = require('../../middleware/jsonFormat');
const userIsExist = require('../../validator/user.isExist');
const userLogin = require('../../validator/user.login');
const userList = require('../../validator/user.list');

const { isExistService, loginService, userListService } = require('../service/user.service');


router.prefix('/api/user');

// 用户名是否存在
router.get('/isExist',
    validate(userIsExist),
    async (ctx, next) => {
        const { userName } = ctx.request.query;
        ctx.body = await isExistService(userName);
    }
)

// 登陆
router.get('/login',
    validate(userLogin),
    async (ctx, next) => {
        const { userName, password } = ctx.request.query;
        ctx.body = await loginService({ ctx, userName, password });
    }
)

// 分页查询用户列表
router.get('/getUserList',
    isLogin(),
    jsonFormat(userList),
    validate(userList),
    async (ctx, next) => {
        const { nickName, gender, current, size } = ctx.request.query;
        ctx.body = await userListService({nickName, gender, current, size});
    }
)

module.exports = router;