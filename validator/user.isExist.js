/**
 * @description /api/user/isExist   json_schema
 */
const userIsExist = {
    type: 'object',
    required: ['userName'],
    properties: {
        userName: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        }
    }
}

module.exports = userIsExist;