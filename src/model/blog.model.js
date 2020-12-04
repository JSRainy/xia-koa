/**
 * @description blog model
 */
const Sequelize = require('sequelize');
const sequelize = require('../../db/mysql');
const User = require('./user.model');
const File = require('./file.model');

const Blog = sequelize.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '标题'
    },
    content: {
        type: Sequelize.TEXT,
        comment: '内容'
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '作者id'
    },
    fileId: {
        type: Sequelize.STRING,
        comment: '附件id'
    }
})

// 关联外键
Blog.belongsTo(User, {
    foreignKey: 'author'
})
Blog.belongsTo(File, {
    foreignKey: 'fileId'
})


module.exports = Blog;