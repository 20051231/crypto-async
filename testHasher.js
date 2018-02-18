var binding = require('.');
var crypto = require('crypto');

async function test() {
    const a = new Buffer('foo');
    const b = new Buffer('bar');

    const hasher = binding.createHash('md5');
    await hasher.update(a);
    await hasher.update(b);
    const h = hasher.digest();
    console.log(h.toString('hex'));

    const chasher = crypto.createHash('md5');
    chasher.update(a);
    chasher.update(b);
    const ch = chasher.digest();
    console.log(ch.toString('hex'));

    if(h.toString('hex') !== ch.toString('hex'))
        throw new Error('Hash not match');
}

test().then(() => console.log('done'), (e) => { throw e });