/**
 * @description ajv 验证 json schema
 */
const Ajv = require('ajv');
const { Failure } = require('../utils/Message');

const ajv = new Ajv();

/**
 * 验证请求参数格式
 * @param {object} schema 规定的请求参数格式
 */
const validate = (schema) => {
    return async function (ctx, next) {
        let data = {};
        const method = ctx.request.method;
        if (method === 'POST') {
            data = ctx.request.body;
        }
        if (method === 'GET') {
            data = ctx.request.query;
        }
        const valid = ajv.validate(schema, data);
        if (!valid) {
            const error = ajv.errors[0];
            ctx.body = new Failure(`${error.dataPath ? error.dataPath.slice(1) + ' ' : ''}${error.message}`);
            return;
        }
        await next();
    }
}

module.exports = validate;