/**
 * @description user dao
 */
const User = require('../model/user.model');

/**
 * 通过用户名查询信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
const getUserInfo = async (userName, password) => {
    const where = {
        userName
    }
    if (password) {
        Object.assign(where, { password });
    }
    const userInfo = await User.findOne ({
        attributes: ['id', 'userName', 'nickName', 'gender', 'picture', 'city'],
        where
    })
    if (!userInfo) {
        return null;
    }
    return userInfo.dataValues;
}

const getUserList = async ({ nickName, gender, current, size }) => {
    const where = {};
    if (nickName) {
        Object.assign(where, { nickName });
    }
    if (gender) {
        Object.assign(where, { gender });
    }
    const userList = await User.findAndCountAll ({
        attributes: ['id', 'userName', 'nickName', 'gender', 'picture', 'city'],
        limit: size,
        offset: (current - 1) * size,
        where,
        order: [
            ['createdAt', 'desc']
        ]
    })
    if (!userList) {
        return null
    }
    return {
        total: userList.count,
        data: userList.rows.map(i => i.dataValues)
    }
}

module.exports = {
    getUserInfo,
    getUserList
}