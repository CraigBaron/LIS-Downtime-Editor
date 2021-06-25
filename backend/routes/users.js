const express = require('express')
const router = express.Router()
const sql = require('mssql')
const bcrypt = require('bcrypt')
require('dotenv').config()
const{ v1: uuidv1 } = require('uuid');

const createToken = require("../createToken");
const createRefreshToken = require("../createRFToken");
const verifyAuthToken = require("../middleware/authenticate");

const SendCode = require("../emailNotifications").SendCode;

const userSchema = require("../models/users").userSchema;
const userValidator = require("../models/users").userValidator;


router.post('/login', async (req, res) => {

  const {email, password}  = req.body;
  try{
      var request = new sql.Request();
        request.query("SELECT * FROM Employees WHERE Email = '" + email + "'", async function (err, recordset) {
            if(err) {
              console.log(err);
              return;
            }
            if(recordset.recordsets[0].length == 0){
              return res.json({status : "Fail"})
            }
              if(await bcrypt.compare(password, recordset.recordsets[0][0].Password)){
                    const privledge = recordset.recordsets[0][0].Privledge;
                    const firstName = recordset.recordsets[0][0].FirstName;
                    const lastName = recordset.recordsets[0][0].LastName;
                    const user = {email : email, firstName : firstName, lastName : lastName, privledge : privledge}
                    const acessToken = createToken(user);
                    const refreshToken = createRefreshToken(user);
                    res.json({acessToken: acessToken, refreshToken: refreshToken,  user : user})
              }else{
                res.send('Not ALlowed')
              }
        })
      }catch(err){
        res.status(500).send()
      }
})

router.post('/signUp', async (req,res) => {
   
    const post = {email, password, confirmPassword, firstName, lastName, privledge} = req.body;
    const validationResult = userValidator.validate(post, userSchema);
    if(validationResult !== true){
      return res.json({message : "Validation failed", errors: validationResult});
    }
    
    var request = new sql.Request();
    request.query("SELECT * FROM Employees WHERE Email = '" + email + "'", async function(err, recordset){
      try{
        if(recordset.recordsets[0].length > 0){
          return res.json({error : 'There Already exists an account with this email'});
        }
      }catch(err){
        return res.status(500).send()
      }
      create();
    })

    const create = async () => {
        try{
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)
        
            var request = new sql.Request();
            request.query("INSERT INTO Employees (Email, Password, FirstName, LastName, Privledge ) VALUES ('" + email + "','" +  hashedPassword + "','" + firstName + "','" + lastName + "','" + privledge + "')", function (err, recordset) {
            if (err) console.log(err)

            return res.json({status : "Successful"});
        });
        }catch (err){
            return res.status(500).send();
        }
    }
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


router.get('/', (req,res) => {

  try{
    var request = new sql.Request();
    request.query("SELECT Email, FirstName, LastName, Privledge, ID FROM Employees", function (err, recordset) {

      if (err){
        console.log(err);
        return;
      } 
      //return res.json(recordset.recordsets)
      var temp = recordset.recordset

      for(var i = 0; i < temp.length; i++){
        temp[i].id = temp[i].ID;
        delete temp[i].ID;
    }
    res.json(temp);  
    })
  }catch(err) {
      res.status(500).json({message : err.message})
  }
})

router.post('/forgot', (req, res) => {
  const {email} = req.body;
  try{
          var request = new sql.Request();
          request.query("SELECT * FROM Employees WHERE Email = '" + email + "'", async function (err, recordset) {
              if(err) {
                console.log(err);
                return;
              }
              if(recordset.recordsets[0].length > 0){
                makeCode();
              }
              else{
                return res.json({status : "Fail"})
              }
          })
        }catch(err){
          res.status(500).send()
        }
      const makeCode = () => {
          let dt = new Date()
          dt.setMinutes(dt.getMinutes()+10);
          dt.setHours(dt.getHours()-4);
          dt = dt.toISOString().slice(0, 19).replace('T', ' ');
          
          const user = {
            email : email,
            code : uuidv1(),
            expires : dt
          }
          
          var request = new sql.Request();
          
          request.query("INSERT INTO ResetPW(Email, Code, Expires) VALUES('" + user.email + "','" + user.code + "','" + user.expires + "')", async function (err, recordset) {
            if(err) {
              console.log(err);
              return;
            }

          SendCode(user);
          return res.json({status : "Success"})
          })
        }
})

router.post('/resetpassword', async (req,res) => {

      const {code, email, password, confirmPassword} = req.body;
      if(password != confirmPassword)
      {
        res.json({status: "Error : Passwords do not match."})
      }
      let ct = new Date()
      ct.setHours(ct.getHours()-4);
      ct = ct.toISOString().slice(0, 19).replace('T', ' ');
      var request = new sql.Request();
      request.query("SELECT * FROM ResetPW WHERE Code = '" + code + "' AND Email = '" + email + "' AND Expires > '" + ct +"'", async function (err, recordset) {
      if(err) {
        console.log(err);
        return;
      }
      if(recordset.recordsets[0].length > 0)
      {
            try{
              const salt = await bcrypt.genSalt()
              const hashedPassword = await bcrypt.hash(password, salt)
              
              var request = new sql.Request();
              request.query("UPDATE Employees SET Password = '" + hashedPassword + "' WHERE Email = '" + email + "'", function (err, recordset) {
              if (err) console.log(err)

              return res.json({status : "Success"})
          });
          }catch (err){
              return res.status(500).send();
          }
      }
      else
      {
        return res.json({status : "Error : Code expired or incorrect code."});
      }
  })

})

//edits user
router.post('/editUser',async (req, res) => {
  const {firstName, lastName, role, ID} = req.body;
    var request = new sql.Request();
    request.query("UPDATE Employees SET FirstName = '" + firstName + "', LastName = '" + lastName + "', Privledge = '" + role + "' WHERE ID = '"+ ID +"'",  function (err, recordset) {
      if (err){
          console.log(err);
          return;
      } 
      res.json({status : "Successful"})
  })

})
//logout user / delete refresh token
router.post('/logout', verifyAuthToken, async (req, res) => {
    const {refreshToken} = req.body;
    const email = req.user.email;
    var request = new sql.Request();
    request.query("UPDATE Employees SET RefreshToken = '" + null + "' WHERE Email = '"+ email +"'",  function (err, recordset) {
        if (err){
            console.log(err);
            return;
        } 
        res.json({status : "Successful"})
    }) 

})



module.exports = router