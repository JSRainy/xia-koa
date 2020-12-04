/**
 * @description blog service
 */
const { Success, Failure } = require("../../utils/Message");
const { createBlog, updateBlog, getBlogList, getBlogById } = require('../dao/blog.dao');

/**
 * 新增博客 Service
 * @param {string} title    标题
 * @param {string} content  内容 
 * @param {string} author   作者 id 
 * @param {string} fileId   附件 id
 */
const newBlogService = async ({ title, content, author, fileId }) => {
    const result = await createBlog({ title, content, author, fileId });
    if (!result) {
        return new Failure('博客新增失败！');
    }
    return new Success(result, '博客新增成功！');
}

/**
 * 修改博客 Service
 * @param {number} id       博客 id
 * @param {string} title    标题
 * @param {string} content  内容
 * @param {string} fileId   附件 id
 */
const updateBlogService = async ({ id, title, content, author, fileId }) => {
    const result = await updateBlog({ id, title, content, author, fileId });
    if (!result) {
        return new Failure('博客修改失败！');
    }
    return new Success('博客修改成功！');
}

/**
 * 分页获取博客列表
 * @param {string} title    标题
 * @param {string} content  内容
 * @param {number} author   作者 id
 * @param {number} current  页码
 * @param {number} size     页数
 */
const blogListService = async ({ title, content, author, current, size }) => {
    const blogList = await getBlogList({ title, content, author, current, size });
    if (!blogList) {
        return new Failure('获取博客列表失败！')
    }
    return new Success(blogList, '获取博客列表成功！')
}

/**
 * 博客详情 service
 * @param {number} id 
 */
const blogDetailService = async (id) => {
    const blogInfo = await getBlogById(id);
    if (!blogInfo) {
        return new Failure('获取博客详情失败！');
    }
    return new Success(blogInfo, '获取博客详情成功！');
}

module.exports = {
    newBlogService,
    updateBlogService,
    blogListService,
    blogDetailService
}