let DEFAULT_ALPHABET = 'mn6j2c4rv8bpygw95z7hsdaetxuk3fq';
let DEFAULT_BLOCK_SIZE = 24;
let MIN_LENGTH = 5;

function mapArrStr(arrstr){
    let map = new Map();
    for (let i = 0; i < arrstr.length; i++) {
        map.set(i, arrstr[i]);
    }
    return map;
}

class UrlEncoder{
    constructor(alphabet = DEFAULT_ALPHABET, blockSize = DEFAULT_BLOCK_SIZE){
        this.alphabet = alphabet;
        this.blockSize = blockSize;
        this.mask = (1 << blockSize) - 1;
        // 创建数组[this.mask-1, ... , 1, 0]
        this.mapping = [... new Array(this.blockSize).keys()].reverse();
    }

    encodeUrl(n, minLength = MIN_LENGTH){
        return this.enbase(this.encode(n), minLength);
    }

    decodeUrl(n){
        return this.decode(this.debase(n));
    }

    encode(n){
        return (n & ~this.mask) | this._encode(n & this.mask);
    }

    _encode(n){
        let result = 0;
        let map = mapArrStr(this.mapping);
        for(let [key,value] of map){
            if(n & (1 << key)){
                result |= ( 1 << value);
            }
        }
        return result;
    }

    decode(n){
        return (n & ~this.mask) | this._decode(n & this.mask);
    }

    _decode(n){
        let result = 0;
        let map = mapArrStr(this.mapping);
        for(let [key,value] of map){
            if(n & (1 << value)){
                result |= ( 1 << key);
            }
        }
        return result;
    }

    enbase(x, minLength = MIN_LENGTH){
        let result = this._enbase(x);
        let padding = '';
        for (let i = 0; i < (minLength - result.length); i++){
            padding += this.alphabet[0];
        }
        return padding + result;
    }

    _enbase(x){
        let n = this.alphabet.length;
        x = Math.floor(x);
        if(x < n){
            return this.alphabet[x];
        }
        return this._enbase(Math.floor(x / n)) + this.alphabet[x % n];
    }

    debase(x){
        let n = this.alphabet.length;
        let result = 0;
        let xReverse = x.split('').reverse().join('');
        for (let [key, value] of mapArrStr(xReverse)){
            result += this.alphabet.indexOf(value) * ( n ** key);
        }
        return result;
    }
}

// test
let urlEncoder = new UrlEncoder();

for(let i=1; i<100; i++){
    let url = urlEncoder.encodeUrl(i);
    let num = urlEncoder.decodeUrl(url);
    console.log(`num: ${num}, url: ${url}`);   
}
