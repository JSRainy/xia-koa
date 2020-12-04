/**
 * @description session config
 */
const redisStore = require('koa-redis');
const session = require('koa-generic-session');

const sessionKey = ['FRQ$!CADR%'];
const sessionConfig = session({
    key: 'koa.sid',
    prefix: 'koa:sess:',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 1000
    },
    ttl: 60 * 1000,
    store: redisStore({
        all: 'localhost:6379'
    })
})

module.exports = {
    sessionKey,
    sessionConfig
}