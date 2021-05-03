const express = require('express')
const router = express.Router()
const sql = require('mssql');

const verifyAuthToken = require("../middleware/authenticate");
const conn = require("../../server").conn
//get all records
router.get('/' /*,verifyAuthToken*/, async (req, res) => {
    try{
        var request = new sql.Request();
    
        request.query("SELECT * FROM NewRecords", function (err, recordset) {
            if (err) console.log(err)

            res.json(recordset);
        });
    }catch (err){
        res.status(500).json({message: err.message})
    }
})

//add new record
router.post('/add'/*,verifyAuthToken*/, async (req, res) => {
    
    const { uniqueID, pkDowntimeEventID, startDate, endDate, durationTotalMinutes, LineID, machine, componentID, comments, secondarypk, reason, status } = req.body;

    try{
        var request = new sql.Request();
    
        request.query("INSERT INTO NewRecords (UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk, Reason, Status) VALUES ('" + uniqueID + "','" + pkDowntimeEventID + "','" + startDate + "','" + endDate + "','" + durationTotalMinutes + "','" + LineID + "','" + machine + "','" + componentID + "', '" + comments + "', '" + secondarypk + "', '" + reason + "', '" + status + "')", function (err, recordset) {
            if(err)
            {
                console.log(err)
                return;
            }

            res.send("Succsess");
        });
    }catch (err){
        res.status(500).json({message: err.message})
    }
  
})
//delete record
router.delete('/:id', (req, res) => {

})

module.exports = router