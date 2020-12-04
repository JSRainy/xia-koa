/**
 * @description 请求参数格式转换（string => number）
 */

/** 
 * 请求参数格式转换（string => number）
 * @param {object} schema 规定的请求参数格式
 */
const jsonFormat = (schema) => {
    return async function (ctx, next) {
        // 获取请求参数
        let data = {};
        const method = ctx.request.method;
        if (method === 'POST') {
            data = ctx.request.body;
        }
        if (method === "GET") {
            data = ctx.request.query;
        }
        // 获取 schema 数据类型
        const propertyArr = [];
        const propertyObj = schema.properties;
        for (const key in propertyObj) {
            if (propertyObj.hasOwnProperty(key)) {
                propertyArr.push({
                    name: key,
                    type: propertyObj[key].type
                })
            }
        }
        // 字符串转数字类型
        propertyArr.forEach(i => {
            if (i.type === 'number' && data[i.name]) {
                const num = Number(data[i.name]);
                if (num) {
                    data[i.name] = num;
                }
            }
        })
        await next();
    }
}

module.exports = jsonFormat;