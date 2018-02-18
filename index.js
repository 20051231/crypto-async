'use strict';

var binding = require('./binding.node');

module.exports.cipher = function(...args) {
  if(args.length === 13 || args.length === 5) {
    return new Promise((resolve, reject) => {
      module.exports.cipher(...args, (err, result) => {
        if(err) reject(err);
        else resolve(result);
      });
    })
  }
  if (arguments.length === 14) return binding.cipher.apply(this, arguments);
  if (arguments.length !== 6) throw new Error('bad number of arguments');
  var algorithm = arguments[0];
  var encrypt = arguments[1];
  var key = arguments[2];
  var keyOffset = 0;
  var keySize = key.length;
  var iv = arguments[3];
  var ivOffset = 0;
  var ivSize = iv.length;
  var source = arguments[4];
  var sourceOffset = 0;
  var sourceSize = source.length;
  var target = Buffer.alloc(sourceSize + 64);
  var targetOffset = 0;
  var end = arguments[5];
  binding.cipher(
    algorithm,
    encrypt,
    key,
    keyOffset,
    keySize,
    iv,
    ivOffset,
    ivSize,
    source,
    sourceOffset,
    sourceSize,
    target,
    targetOffset,
    function(error, targetSize) {
      if (error) return end(error);
      end(undefined, target.slice(targetOffset, targetOffset + targetSize));
    }
  );
};

module.exports.hash = function(...args) {
  if(args.length === 6 || args.length === 2) {
    return new Promise((resolve, reject) => {
      module.exports.hash(...args, (err, result) => {
        if(err) reject(err);
        else resolve(result);
      });
    })
  }
  if (arguments.length === 7) return binding.hash.apply(this, arguments);
  if (arguments.length !== 3) throw new Error('bad number of arguments');
  var algorithm = arguments[0];
  var source = arguments[1];
  var sourceOffset = 0;
  var sourceSize = source.length;
  var target = Buffer.alloc(64); // Support up to 512 bits.
  var targetOffset = 0;
  var end = arguments[2];
  binding.hash(
    algorithm,
    source,
    sourceOffset,
    sourceSize,
    target,
    targetOffset,
    function(error, targetSize) {
      if (error) return end(error);
      end(undefined, target.slice(targetOffset, targetOffset + targetSize));
    }
  );
};

module.exports.hmac = function(...args) {
  if(args.length === 9 || args.length === 3) {
    return new Promise((resolve, reject) => {
      module.exports.hmac(...args, (err, result) => {
        if(err) reject(err);
        else resolve(result);
      });
    })
  }
  if (arguments.length === 10) return binding.hmac.apply(this, arguments);
  if (arguments.length !== 4) throw new Error('bad number of arguments');
  var algorithm = arguments[0];
  var key = arguments[1];
  var keyOffset = 0;
  var keySize = key.length;
  var source = arguments[2];
  var sourceOffset = 0;
  var sourceSize = source.length;
  var target = Buffer.alloc(64); // Support up to 512 bits.
  var targetOffset = 0;
  var end = arguments[3];
  binding.hmac(
    algorithm,
    key,
    keyOffset,
    keySize,
    source,
    sourceOffset,
    sourceSize,
    target,
    targetOffset,
    function(error, targetSize) {
      if (error) return end(error);
      end(undefined, target.slice(targetOffset, targetOffset + targetSize));
    }
  );
};

class Hasher {
  constructor(algo) {
    this.hasher = new binding.Hasher(algo);
  }

  update(...args) {
    const cb = args[args.length - 1];
    if(cb && typeof cb === 'function') {
      args.pop();
      if(args.length === 0 || args.length > 3) throw new Error('bad number of arguments');
      const buf = args[0];
      const offset = args[1] || 0;
      const length = args[2] || buf.length - offset;

      this.hasher.update(buf, offset, length, cb);
    } else {
      return new Promise((resolve, reject) => {
        this.update(...args, (err, result) => {
          if(err) reject(err);
          else resolve(result);
        })
      })
    }
  }

  digest(target, targetOffset) {
    const retSize = target !== undefined;
    target = target || Buffer.alloc(64);
    targetOffset = targetOffset || 0;
    const size = this.hasher.digest(target, targetOffset);
    return retSize ? size : target.slice(0, size);
  }
}

module.exports.createHash = function(algo) {
  return new Hasher(algo);
}

// S.D.G.
