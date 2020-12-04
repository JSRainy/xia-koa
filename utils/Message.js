/**
 * @description dto
 */
class Message {
    constructor (data, message) {
        if (typeof data === 'string') {
            this.data = null;
            this.message = data;
            return;
        }
        this.data = data;
        this.message = message;
    }
}

class Success extends Message {
    constructor (data, message) {
        super (data, message);
        this.code = 0;
    }
}

class Failure extends Message {
    constructor (data, message) {
        super (data, message);
        this.code = -1;
    }
}

module.exports = {
    Success,
    Failure
}