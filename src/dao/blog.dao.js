/**
 * @description blog dao
 */
const { Op } = require('sequelize');
const User = require('../model/user.model');
const Blog = require('../model/blog.model');
const File = require('../model/file.model');

/**
 * 新增博客
 * @param {string} title    标题
 * @param {string} content  内容
 * @param {number} author   作者 id
 * @param {string} fileId   附件 id
 */
const createBlog = async ({ title, content, author, fileId }) => {
    const result = await Blog.create({
        title,
        content,
        author,
        fileId
    })
    if (!result) {
        return null;
    }
    return result;
}

/**
 * 更新博客
 * @param {number} id       博客 id
 * @param {string} title    标题
 * @param {string} content  内容
 * @param {number} author   作者 id
 * @param {string} fileId   附件 id
 */
const updateBlog = async ({ id, title, content, author, fileId }) => {
    const update = {
        title,
        content,
        fileId
    }
    const result = await Blog.update(update, {
        where: {
            id,
            author
        }
    })
    if (!result) {
        return null;
    }
    return result;
}

/**
 * 分页获取博客列表
 * @param {string} title    标题
 * @param {string} content  内容
 * @param {number} author   作者 id
 * @param {number} current  页数
 * @param {number} size     页码
 */
const getBlogList = async ({ title, content, author, current, size }) => {
    const where = {
        author
    }
    if (title) {
        Object.assign(where, {
            title: {
                [Op.like]: `%${title}%`
            }
        });
    }
    if (content) {
        Object.assign(where, {
            content: {
                [Op.like]: `%${content}%`
            }
        });
    }
    const blogList = await Blog.findAndCountAll({
        where,
        limit: size,
        offset: (current - 1) * size,
        order: [
            ['createdAt', 'desc']
        ]
    })
    if (!blogList) {
        return null;
    }
    return {
        total: blogList.count,
        data: blogList.rows.map(i => i.dataValues)
    }
}

/**
 * 获取用户详情
 * @param {number} id 
 */
const getBlogById = async (id) => {
    const blogInfo = await Blog.findOne({
        attributes: ['id', 'title', 'content'],
        where: {
            id
        },
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'gender', 'picture', 'city']
            },
            {
                model: File,
                attributes: ['fileName', 'filePath']
            }
        ]
    })
    if (!blogInfo) {
        return null;
    }
    return blogInfo;
}

module.exports = {
    createBlog,
    updateBlog,
    getBlogList,
    getBlogById
}