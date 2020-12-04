/**
 * @description /api/blog/getBlogById   json_schema
 */
const blogDetail = {
    type: 'object',
    required: ['id'],
    properties: {
        id: {
            type: 'number',
            minimun: 1
        }
    }
}

module.exports = blogDetail;