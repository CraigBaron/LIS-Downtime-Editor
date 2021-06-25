const { json } = require("body-parser");
const jwt = require("jsonwebtoken")
require('dotenv').config()
const sql = require('mssql')
const createToken = require("../createToken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const {refreshToken} = req.body;
    if(!token)
        return res.status(401).json({error: "Acess Denied"})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        
        if(err){
            if(refreshToken == null) return res.sendStatus(401)
            var request = new sql.Request();
            request.query("SELECT RefreshToken FROM Employees WHERE RefreshToken = '" + refreshToken + "'", async function (err, recordset) {
                if(err) {
                  console.log(err);
                  return;
                }
                //check for a valid refresh token in the database
                if(recordset.recordsets[0].length == 0){
                    return res.sendStatus(403)
                }
                //if we have a valid refreshToken create a new access token with it
                   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, info) => {
                    if (err) return res.sendStatus(403);
                    const user = {email : info.email, firstName : info.firstName, lastName : info.lastName, privledge : info.privledge}
                    const acessToken = createToken(user)
                    res.json({acessToken: acessToken}) 
                }) 
            })
        } 
        else{
        req.user = user
        next();
        }
    })
    
}
module.exports = authenticateToken;

