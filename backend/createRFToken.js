const jwt = require("jsonwebtoken");
require("dotenv").config();
const sql = require('mssql')

 function createRefreshToken(user){

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    var request = new sql.Request();
    request.query("UPDATE Employees SET RefreshToken = '" + refreshToken + "' WHERE Email = '"+ user.email +"'",  function (err, recordset) {
      if (err){
          console.log(err);
          return;
      } 
      console.log("Storing new Token...")
    })
    
    return refreshToken;

}
module.exports = createRefreshToken; 