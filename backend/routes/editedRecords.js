const express = require('express')
const router = express.Router()
const sql = require('mssql');

const verifyAuthToken = require("../middleware/authenticate");

//get all records
router.get('/', verifyAuthToken, async (req, res) => {
    try{
        var request = new sql.Request();
    
        request.query("SELECT * FROM EditedRecords", function (err, recordset) {
            if (err) console.log(err)

            res.json(recordset);
        });
    }catch (err){
        res.status(500).json({message: err.message})
    }
})

//add new record
router.post('/add', verifyAuthToken, async (req, res) => {
    
    const { uniqueID, pkDowntimeEventID, startDate, endDate, durationTotalMinutes, lineID, machine, componentID, comments, secondarypk } = req.body;

    try{
        var request = new sql.Request();
    
        request.query("INSERT INTO EditedRecords (StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk) VALUES ('" + startDate + "','" + endDate + "','" + durationTotalMinutes + "','" + lineID + "','" + machine + "','" + componentID + "', '" + comments + "', '" + secondarypk + "')", function (err, recordset) {
            if (err) console.log(err)

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