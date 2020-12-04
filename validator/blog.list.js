/**
 * @description /api/blog/getBlogList   json_schema
 */
const blogList = {
    type: 'object',
    required: ['current', 'size'],
    properties: {
        title: {
            type: 'string',
            maxLength: 255
        },
        content: {
            type: 'string',
            maxLength: 255
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

module.exports = blogList;