/**
 * @description /api/file/getFileList   json_schema
 */
const fileList = {
    type: 'object',
    required: ['current', 'size'],
    properties: {
        fileName: {
            type: 'string',
            maxLength: 255
        },
        fileType: {
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

module.exports = fileList;