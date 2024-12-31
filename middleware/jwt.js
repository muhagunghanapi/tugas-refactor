const jwt = require('jsonwebtoken');
const secretKey = 'rahasiasecure'; 
const user = {
    id: 1,
    username: 'agung'
};
const token = jwt.sign(user, secretKey, { expiresIn: '1h'});
console.log('token', token);

const decoded = jwt.verify(token, secretKey);
console.log('decoded', decoded);