const jwt = require("jsonwebtoken");
require("dotenv").config();

function createToken(user){

    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})

    return token;
};

module.exports =  createToken;