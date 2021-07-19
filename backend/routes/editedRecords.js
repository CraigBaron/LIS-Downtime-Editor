const express = require('express')
const router = express.Router()
const sql = require('mssql');

const verifyAuthToken = require("../middleware/authenticate");
const SendEmail = require("../emailNotifications").FindRecipients;
//get all records
router.post('/' ,verifyAuthToken, async (req, res) => {
    
        let {line} = req.body
        
        if(line === 0){
            var request = new sql.Request();
            request.query("SELECT * FROM EditedRecords", function (err, recordset) {
                if (err){
                     console.log(err);
                     return;
                }
                let records = recordset.recordset
                for(let i=0;i<records.length;i++){
                    records[i].id = records[i].UniqueID
                }
                res.json({records : records, accessToken: req.accessToken});
            });
        }
        else{
        var request = new sql.Request();
        request.query("SELECT * FROM EditedRecords WHERE LineID = '" + line + "'", function (err, recordset) {
            if (err){
                 console.log(err);
                 return;
            }
            let records = recordset.recordset
            for(let i=0;i<records.length;i++){
                records[i].id = records[i].UniqueID
            }
            res.json({records : records, accessToken: req.accessToken});
        });
    }
  
})

//add new record
router.post('/add',verifyAuthToken, async (req, res) => {

    const { id, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk, Reason} = req.body;

    var request = new sql.Request();
    request.query("SELECT * FROM EditedRecords WHERE UniqueID = '" + id + "'", async function(err, recordset){
      
        if(recordset.recordsets[0].length > 0){
          return res.json({status : 'Error : There already exists an edited records with this UniqueID', accessToken: req.accessToken});
        }
     
      create();
    })

const create = async () => {
        let Status = "Pending";
        try{
            var request = new sql.Request();
            request.query("INSERT INTO EditedRecords (UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk, Reason, Status) VALUES ('" + id + "','" + pkDowntimeEventID + "','" + StartDateTime + "','" + EndDateTime + "','" + DurationTotalMinutes + "','" + LineID + "','" + Machine + "','" + ComponentID + "', '" + Comments + "', '" + Secondarypk + "', '" + Reason + "', '" + Status + "')", function (err, recordset) {
                if(err)
                {
                    console.log(err);
                    return;
                }
                res.json({status : "Successful! The edited record has been submitted", accessToken: req.accessToken});
                SendEmail();
            });
        }catch (err){
            res.status(500).json({message: err.message})
        }
    }
})
//edit status of record or delete
router.post('/edit', verifyAuthToken, async (req, res) => {
    const { ID, status} = req.body;
    if(status)
    {
        var request = new sql.Request();
        if(status === "Delete")
        {
            request.query("DELETE FROM EditedRecords WHERE UniqueID = '"+ ID +"'", function (err, recordset) {
                if (err){
                    console.log(err);
                    return;
                } 

                res.json({status : "Successful", accessToken: req.accessToken})
            })
        }
        else
        {
            request.query("UPDATE EditedRecords SET Status = '"+ status +"' WHERE UniqueID = '"+ ID +"'", function (err, recordset) {
                if (err){
                    console.log(err);
                    return;
                } 
                res.json({status : "Successful", accessToken: req.accessToken})
            })
        }
    }
    else
    {
        res.json({status : "You must select a change"});
    }
})

router.get('/numPending' ,verifyAuthToken, async (req, res) => {
    
        var request = new sql.Request();
        request.query("SELECT * FROM EditedRecords WHERE Status = 'Pending'", function (err, recordset) {
            if (err){
                 console.log(err);
                 return;
            }
            res.json({numRecords: recordset.recordsets[0].length, accessToken: req.accessToken});
        });
   
})

router.get('/pending' ,verifyAuthToken, async (req, res) => {
    
        var request = new sql.Request();
        request.query("SELECT * FROM EditedRecords WHERE Status = 'Pending'", function (err, recordset) {
            if (err){
                 console.log(err);
                 return;
            }
            res.json(recordset.recordsets);
        });
    
})
module.exports = router
