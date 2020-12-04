/**
 * @description blog controller
 */
const router = require('koa-router')();
const isLogin = require('../../middleware/isLogin');
const jsonFormat = require('../../middleware/jsonFormat');
const validate = require('../../middleware/validate');

const { newBlogService, updateBlogService, blogListService, blogDetailService } = require('../service/blog.service');

const newBlog = require('../../validator/blog.new');
const updateBlog = require('../../validator/blog.update');
const blogList = require('../../validator/blog.list');
const blogDetail = require('../../validator/blog.detail');

router.prefix('/api/blog');

// 新增博客
router.post('/newBlog',
    isLogin(),
    jsonFormat(newBlog),
    validate(newBlog),
    async (ctx, next) => {
        const { id } = ctx.session.userinfo;
        const { title, content, fileId } = ctx.request.body;
        ctx.body = await newBlogService({
            title,
            content,
            fileId,
            author: id
        })
    }
)

// 修改博客
router.post('/updateBlog',
    isLogin(),
    jsonFormat(updateBlog),
    validate(updateBlog),
    async (ctx, next) => {
        const author = ctx.session.userinfo.id;
        const { id, title, content, fileId } = ctx.request.body;
        ctx.body = await updateBlogService({ id, title, content, author, fileId })
    }
)

// 分页获取博客列表
router.get('/getBlogList',
    isLogin(),
    jsonFormat(blogList),
    validate(blogList),
    async (ctx, next) => {
        const { id } = ctx.session.userinfo;
        const { title, content, current, size } = ctx.request.query;
        ctx.body = await blogListService({
            title,
            content,
            author: id,
            current,
            size
        })
    }
)

// 获取博客详情
router.get('/getBlogById',
    isLogin(),
    jsonFormat(blogDetail),
    validate(blogDetail),
    async (ctx, next) => {
        const { id } = ctx.request.query;
        ctx.body = await blogDetailService(id);
    }
)

module.exports = router;