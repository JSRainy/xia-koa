/**
 * @description sequelize 连接测试
 */
const sequelize = require('../mysql');

sequelize.authenticate().then(() => {
    console.log('Mysql based on Sequelize is connected!');
}).catch(error => {
    console.error('Mysql base on Sequelize is something worng: ' + error);
})
