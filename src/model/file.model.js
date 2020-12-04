/**
 * @description file model
 */
const Sequelize = require('sequelize');
const sequelize = require('../../db/mysql');
const User = require('./user.model');

const File = sequelize.define('file', {
    fileName: {
        type: Sequelize.STRING,
        comment: '文件名称'
    },
    fileType: {
        type: Sequelize.STRING,
        comment: '文件类型'
    },
    fileSize: {
        type: Sequelize.STRING,
        comment: '文件大小'
    },
    filePath: {
        type: Sequelize.STRING,
        comment: '文件路径'
    },
    userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '创建人id'
    }
})

// 外键关联
File.belongsTo(User, {
    foreignKey: 'userid'
})
User.hasMany(File, {
    foreignKey: 'userid'
})


module.exports = File;