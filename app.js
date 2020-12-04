const Koa = require('koa');
const json = require('koa-json');
const logger = require('koa-logger');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const RouterManage = require('./middleware/routerManage');

const { sessionKey, sessionConfig } = require('./db/session');

const app = new Koa();

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  	enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})

// session
app.keys = sessionKey;
app.use(sessionConfig);

// routes
new RouterManage(app);

// error-handling
app.on('error', (err, ctx) => {
  	console.error('server error', err, ctx);
});

module.exports = app;