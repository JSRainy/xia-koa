/**
 * @description /api/user/getUserList json_schema
 */
const userList = {
    type: 'object',
    required: ['current', 'size'],
    properties: {
        nickName: {
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        gender: {
            type: 'number',
            maximum: 3,
            minimum: 1
        },
        current: {
            type: 'number',
            minimum: 1
        },
        size: {
            type: 'number'
        }
    }
}

module.exports = userList;