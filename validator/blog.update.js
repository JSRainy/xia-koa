/**
 * @description /api/blog/updateBlog    json_schema
 */
const updateBlog = {
    type: 'object',
    required: ['id', 'title'],
    properties: {
        id: {
            type: 'number'
        },
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

module.exports = updateBlog;