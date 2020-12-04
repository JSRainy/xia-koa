/**
 * @description file dao
 */
const { Op } = require('sequelize');
const File = require('../model/file.model');

/**
 * 上传文件至数据库
 * @param {string} userid   上传人 id
 * @param {string} fileName 文件名
 * @param {string} fileSize 文件大小
 * @param {string} fileType 文件类型
 * @param {string} filePath 文件路径
 */
const uploadDao = async ({ userid, fileName, fileSize, fileType, filePath }) => {
    const result = await File.create({
        userid,
        fileName,
        fileSize,
        fileType,
        filePath
    })
    if (!result) {
        return null;
    }
    return result;
}

/**
 * 分页查询当前登陆人上传的文件列表
 * @param {string} userid   登陆人 id
 * @param {string} fileName 文件名
 * @param {string} fileType 文件类型
 * @param {string} current  页码
 * @param {string} size     页数
 */
const getFileList = async ({ userid, fileName, fileType, current, size }) => {
    const where = {
        userid
    };
    if (fileName) {
        Object.assign(where, {
            fileName: {
                [Op.like]: `%${fileName}%`
            }
        });
    }
    if (fileType) {
        Object.assign(where, {
            fileType: {
                [Op.like]: `%${fileType}%`
            }
        });
    }
    const fileList = await File.findAndCountAll ({
        where,
        limit: size,
        offset: (current - 1) * size
    })
    if (!fileList) {
        return null;
    }
    return {
        total: fileList.count,
        data: fileList.rows.map(i => i.dataValues)
    }
}

module.exports = {
    uploadDao,
    getFileList
}