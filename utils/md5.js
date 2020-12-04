/**
 * @description md5 加密
 */
const crypto = require('crypto');

const ENCODE_KEY = 'DESFQS!#$FSQS_!ED';

const md5 = (content) => {
    const str = `password=${content}&key=${ENCODE_KEY}`;
    const md5 = crypto.createHash('md5');
    return md5.update(str).digest('hex');
}

module.exports = md5;