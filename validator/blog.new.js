/**
 * @description /api/blog/newBlog   json_schema
 */
const newBlog = {
    type: 'object',
    required: ['title'],
    properties: {
        title: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        content: {
            type: 'string',
            maxLength: 255
        },
        fileId: {
            type: 'number'
        }
    }
}

module.exports = newBlog;