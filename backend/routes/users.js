const express = require('express')
const router = express.Router()
const sql = require('mssql')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {

  const email = req.body.email
  var request = new sql.Request();
    request.query("SELECT * FROM Employees WHERE Email = '" + email + "'", async function (err, recordset) {
        if(err) console.log(err)

        if(recordset.recordsets == null){
          return res.status(400).send('No User')
        }
        
          if(await bcrypt.compare(req.body.password, recordset.recordsets[0][0].Password)){
                const user = {email : email}
                const acessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                res.json({acessToken: acessToken})
          }else{
            res.send('Not ALlowed')
          }
       
    })
})

router.post('/signUp', async (req,res) => {
    

    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
        var request = new sql.Request();

        request.query("INSERT INTO Employees (Email, Password, privledge ) VALUES ('" + req.body.email + "','" +  hashedPassword + "','" + req.body.level + "')", function (err, recordset) {
        if (err) console.log(err)

         res.json(recordset);
    });
    }catch (err){
        res.status(500).send();
    }
    
})

router.patch('/editUser', (req,res) => {

})

router.delete('/deleteUser', (req,res) => {
    
})


module.exports = router