/**
 * @description /api/user/login json_schema
 */
const userLogin = {
    type: 'object',
    required: ['userName', 'password'],
    properties: {
        userName: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        }
    }
}

module.exports = userLogin;