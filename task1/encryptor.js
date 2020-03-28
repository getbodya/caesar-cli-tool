const {forEach} = require('lodash');
const {Transform} = require('stream');


class CaesarTransform extends Transform{
    constructor(action, shift){
        super();
        this.action = action;
        this.shift = shift;
    }

    _transform(chunk, encoding, cb) {
        let transformChunk;
        
        if(this.action === 'encode') {
            transformChunk = this.encrypt(chunk.toString(), this.shift)
        }

        if(this.action === 'decode') {
            transformChunk = this.encrypt(chunk.toString(), -this.shift)
        }

        cb(null, transformChunk);
    }

    encrypt(data, shift) {
        if (shift < 0) return this.encrypt(data, shift + 26);
        let result = '';

        forEach(data, (char) => {
            const code = char.charCodeAt();
            let chagedCode;

            if ((code >= 65) && (code <= 90)) {
                chagedCode = String.fromCharCode(((code - 65 + shift) % 26) + 65);
            } else if ((code >= 97) && (code <= 122)) {
                chagedCode = String.fromCharCode(((code - 97 + shift) % 26) + 97);
            } else {
                chagedCode = String.fromCharCode(code);
            }
                result +=chagedCode        
            })

        return result;
    }
}

module.exports = {
    CaesarTransform
}