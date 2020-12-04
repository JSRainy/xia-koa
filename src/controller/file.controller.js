/**
 * @description file controller
 */
const router = require('koa-router')();
const koaForm = require('formidable-upload-koa');
const isLogin = require('../../middleware/isLogin');
const jsonFormat = require('../../middleware/jsonFormat');
const validate = require('../../middleware/validate');
const { uploadService, fileListService } = require('../service/file.service');
const fileList = require('../../validator/file.list');

router.prefix('/api/file');

// 文件上传
router.post('/upload', isLogin(), koaForm(), async (ctx, next) => {
    const { id } = ctx.session.userinfo;
    const { name, type, size, path } = ctx.req.files['file'];
    ctx.body = await uploadService({
        userid: id,
        fileName: name,
        fileSize: size,
        fileType: type,
        filePath: path
    })
})

// 获取文件列表
router.get('/getFileList',
    isLogin(),
    jsonFormat(fileList),
    validate(fileList),
    async (ctx, next) => {
        const { id } = ctx.session.userinfo;
        const { fileName, fileType, current, size } = ctx.request.query;
        ctx.body = await fileListService({
            userid: id,
            fileName,
            fileType,
            current,
            size
        })
    }
)

module.exports = router;