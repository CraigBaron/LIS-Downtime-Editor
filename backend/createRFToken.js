const jwt = require("jsonwebtoken");
require("dotenv").config();
const sql = require('mssql')

 function createRefreshToken(user){

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '14d'} )

    var request = new sql.Request();
    request.query("INSERT INTO Tokens(RefreshToken) VALUES('" + refreshToken + "')",  function (err, recordset) {
      if (err){
          console.log(err);
          return;
      } 
      console.log("Storing new Refresh Token...")
    })
    
    return refreshToken;

}
module.exports = createRefreshToken; 