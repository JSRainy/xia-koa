/**
 * @description user service
 */
const md5 = require('../../utils/md5');
const { Success, Failure } = require('../../utils/Message');
const { getUserInfo, getUserList } = require('../dao/user.dao');

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
const isExistService =  async (userName) => {
    const userInfo = await getUserInfo(userName);
    if (!userInfo) {
        return new Success('用户名可以使用！')
    }
    return new Failure('用户名重复！')
}

/**
 * 登陆
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
const loginService = async ({ctx, userName, password}) => {
    const isExist = await getUserInfo(userName);
    if (!isExist) {
        return new Failure('用户不存在！')
    }
    const userinfo = await getUserInfo(userName, md5(password));
    if (!userinfo) {
        return new Failure('密码错误！');
    }
    // if (!ctx.session.userinfo) {
    //     ctx.session.userinfo = userinfo;
    // }
    ctx.session.userinfo = userinfo;

    return new Success(userinfo, '登陆成功！')
}

/**
 * 获取用户列表
 * @param {object}
 * @paramItem {string} nickName 昵称
 * @paramItem {number} gender 性别
 * @paramItem {number} current 页码
 * @paramItem {number} size 页数
 */
const userListService = async ({ nickName, gender, current, size }) => {
    const userList = await getUserList({ nickName, gender, current, size });
    if (!userList) {
        return new Failure('获取用户列表失败！');
    }
    return new Success(userList, '获取用户列表成功！');
}

module.exports = {
    isExistService,
    loginService,
    userListService
}