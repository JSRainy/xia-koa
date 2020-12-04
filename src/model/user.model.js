/**
 * @description user model
 */
const Sequelize = require('sequelize');
const sequelize = require('../../db/mysql');

const User = sequelize.define('user', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: Sequelize.STRING,
        comment: '昵称'
    },
    gender: {
        type: Sequelize.DECIMAL,
        defaultValue: 3,
        comment: '性别'
    },
    picture: {
        type: Sequelize.STRING,
        comment: '头像'
    },
    city: {
        type: Sequelize.STRING,
        comment: '城市'
    }
})

module.exports = User;