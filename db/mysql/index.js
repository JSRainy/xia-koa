/**
 * @description 连接 mysql 数据库
 */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('weibo_koa2', 'root', 'xy19941024', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 1000
    }
})

module.exports = sequelize;