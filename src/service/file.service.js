/**
 * @description file service
 */
const path = require('path');
const fse = require('fs-extra');
const { Failure, Success } = require('../../utils/Message');
const { uploadDao, getFileList } = require('../dao/file.dao');

// 文件最大体积
const MAX_SIZE = 5 * 1024 * 1024;
// 文件存储路径
const FILE_DIR = path.join(__dirname, '..', '..', 'public', 'files');
// 创建文件目录
fse.pathExists(FILE_DIR).then(isExist => {
    if (!isExist) {
        fse.ensureDir(FILE_DIR);
    }
})

/**
 * 文件上传
 * @param {string} fileName 文件名
 * @param {number} fileSize 文件大小
 * @param {string} fileType 文件类型
 * @param {string} filePath 文件路径
 */
const uploadService = async ({ userid, fileName, fileSize, fileType, filePath }) => {
    if (fileSize > MAX_SIZE) {
        await fse.remove(filePath);
        return new Failure('超过文件支持最大体积（1M）!');
    }
    const $filePath = path.join(FILE_DIR, `${Date.now()} - ${fileName}`);
    const result = await uploadDao({ userid, fileName, fileSize, fileType, filePath });
    if (!result) {
        await fse.remove(filePath);
        return Failure('上传附件失败！');
    }
    await fse.move(filePath, $filePath);
    return new Success(result, '上传附件成功！');
}

/**
 * 分页查询当前登陆人上传的文件列表
 * @param {string} userid   登陆人 id
 * @param {string} fileName 文件名
 * @param {string} fileType 文件类型
 * @param {string} current  页码
 * @param {string} size     页数
 */
const fileListService = async ({ userid, fileName, fileType, current, size }) => {
    const fileList = await getFileList({ userid, fileName, fileType, current, size });
    if (!fileList) {
        return new Failure('获取文件列表失败！');
    }
    return new Success(fileList, '获取文件列表成功！')
}

module.exports = {
    uploadService,
    fileListService
}