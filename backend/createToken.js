const jwt = require("jsonwebtoken");
require("dotenv").config();

function createToken(user){
    console.log("Generating new token....")
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'})
    return token;
};

module.exports = createToken;

