const jwt = require('jsonwebtoken');
//const path = require('path');
//const env = require('dotenv').config({path: path.join(__dirname, '.env')});


const createToken = (email, secret) =>{
 let token = jwt.sign({ data: email}, secret, {expiresIn: '1h'});
 console.log(token)
 return token;
}


module.exports = createToken

