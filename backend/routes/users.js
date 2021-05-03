const express = require('express')
const router = express.Router()
const sql = require('mssql')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const createToken = require("../createToken");

router.post('/login', async (req, res) => {

  const email = req.body.email
  try{
      var request = new sql.Request();
        request.query("SELECT * FROM Employees WHERE Email = '" + email + "'", async function (err, recordset) {
            if(err) {
              console.log(err);
              return;
            }
            if(recordset.recordsets[0].length == 0){
              return res.status(400).send('No User')
            }
            
              if(await bcrypt.compare(req.body.password, recordset.recordsets[0][0].Password)){
                    const user = {email : email}
                    const acessToken = createToken(user);
                    res.json({acessToken: acessToken})
              }else{
                res.send('Not ALlowed')
              }
              
        })
      }catch(err){
        res.status(500).send()
      }
})

router.post('/signUp', async (req,res) => {
   
        var request = new sql.Request();
        request.query("SELECT * FROM Employees WHERE Email = '" + req.body.email + "'", async function(err, recordset){
          try{
            if(recordset.recordsets[0].length > 0){
             return res.send('There Already exists an account with this email');
            }
          }catch(err){
            return res.status(500).send()
          }
          create();
        })
    
    const create = async () => {
        try{
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
            var request = new sql.Request();

            request.query("INSERT INTO Employees (Email, Password, privledge ) VALUES ('" + req.body.email + "','" +  hashedPassword + "','" + req.body.level + "')", function (err, recordset) {
            if (err) console.log(err)

            return res.json(recordset);
        });
        }catch (err){
            return res.status(500).send();
        }
    }
})

router.patch('/editUser', (req,res) => {

})

router.post('/delete', (req,res) => {
  const { email } = req.body;
  try{
      var request = new sql.Request();
  
      request.query("DELETE FROM Employees WHERE Email = '"+ email +"'", function (err, recordset) {
          if (err){
              console.log(err);
              return;
          } 
          res.json({status : "Successful"})
          
  })
  }catch(err) {
      res.status(500).json({message : err.message})
  }
})


module.exports = router