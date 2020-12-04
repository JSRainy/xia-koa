/**
 * @description 连接 redis 及其方法
 */
const redis = require('redis');

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error', err => {
    console.log('Redis Error: ' + err);
})

class Redis {
    /**
     * redis set
     * @param {string} key     键
     * @param {string} value   值
     * @param {number} timeout 过期时间，单位 s
     */
    set (key, value, timeout = 60) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        redisClient.set(key, value);
        redisClient.expire(key, timeout);
    }

    /**
     * redis get
     * @param {string} key  键
     */
    get (key) {
        return new Promise((resolve, reject) => {
            redisClient.get(key, (err, val) => {
                if (err) {
                    reject(err);
                }
                if (!val) {
                    resolve(val);
                }
                try {
                    resolve(JSON.parse(val));
                } catch (error) {
                    resolve(val);
                }
            })
        })
    }
}

module.exports = new Redis();
