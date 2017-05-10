var connect = require('connect');
var cookieParser = require('cookie-parser');
var crypto =require('crypto');

// cookie-parser node v6.10.0 使用sha256对cookie进行加解码 使用的是crypto中间价； 
// 使用该方法可以解签 $ curl http://localhost:3000/ -H "Cookie:name=s:luna.xAtguMQMj5oEstp6KAKHq2nVODxs+XIYBRPIPC3uNtc"
var signature = require('cookie-parser/node_modules/cookie-signature');
var app = connect();
console.log(signature.sign("luna","tobi is a cool ferret"));

var args="luna";
var app_secret="tobi is a cool ferret";
var sign=crypto.createHmac('sha256', app_secret).update(args).digest().toString('base64');
console.log(sign);
connect()
      .use(cookieParser('tobi is a cool ferret'))
      .use(function(req,res){
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end('hello\n');
      }).listen(3000);

// crypto 加密解密的demo aes对称加解密方法
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);

// Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：
const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex'))