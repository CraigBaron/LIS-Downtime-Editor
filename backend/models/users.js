const Validator = require('fastest-validator');

const userSchema = {

    email : {type: "email", optional: false, max: "100"},
    password : {type: "string", optional: false, max: "100", min: "8"},
    confirmPassword : {type: "equal", field: "password"},
    firstName : {type: "string", optional: false, max: "100"},
    lastName : {type: "string", optional: false, max: "100"},
    privledge : {type: "number", optional: false}
}

 const userValidator = new Validator();

 module.exports.userSchema = userSchema;
 module.exports.userValidator = userValidator;