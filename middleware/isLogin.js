/**
 * @description 是否已登陆 middleware
 */
const redisClient = require('../db/redis');
const { Failure } = require("../utils/Message");

const isLogin = (cookieKey = 'koa.sid', sessionKey = 'koa:sess:') => {
    return async function (ctx, next) {
        try {
            // 验证是否已登陆
            const userinfo = ctx.session.userinfo;
            if (!userinfo) {
                ctx.body = new Failure('请先登录！');
                return;
            }
            // 更新 cookie 过期时间
            const cookieStr = ctx.request.header.cookie;
            const cookiesArr = cookieStr.split('; ').map(i => {
                return {
                    key: i.split('=')[0],
                    value: i.split('=')[1]
                }
            });
            const cookie = cookiesArr.find(j => j.key === cookieKey);
            ctx.cookies.set(cookie.key, cookie.value, {
                path: '/',
                httpOnly: true,
                maxAge: 60 * 1000
            }) 
            // 更新 session 过期时间
            const redisData = await redisClient.get(`${sessionKey}${cookie.value}`);
            redisClient.set(`${sessionKey}${cookie.value}`, redisData);
            await next();
        } catch (error) {
            console.error(error);
            ctx.body = new Failure('请先登录！');
        }
    }
}

module.exports = isLogin;