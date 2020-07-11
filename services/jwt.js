'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'Tokens_Key_123';

exports.createToken = (bussines)=>{
    var payload = {
        sub: bussines._id,
        name: bussines.name,
        username: bussines.username,
        email: bussines.email,
        address: bussines.address,
        iat: moment().unix(),
        exp: moment().add(15, "minutes").unix()
    }
    return jwt.encode(payload, key);
}
