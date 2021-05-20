const express = require('express')
const router = express.Router()
const sql = require('mssql');

const verifyAuthToken = require("../middleware/authenticate");


router.get('/', async (req, res) =>
{
    
    var request = new sql.Request();
    // query to the database and get the records
    request.query("SELECT UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk FROM [DowntimeEvents_Line2 System 1]", function (err, recordset) {
        if (err) console.log(err)

        // send records as a response
        
        return res.json(recordset)
        

    });

    
});

router.post('/add', async (req, res) =>
{
    
    var err = '';
    
    const { uniqueID, pkDowntimeEventID, startDate, endDate, durationTotalMinutes, LineID, machine, componentID, comments, secondarypk } = req.body;
    
    var request = new sql.Request();
    // query to the database and get the records
    request.query("INSERT INTO MachineRecords (UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk) VALUES ('" + uniqueID + "','" + pkDowntimeEventID + "','" + startDate + "','" + endDate + "','" + durationTotalMinutes + "','" + LineID + "','" + machine + "','" + componentID + "', '" + comments + "', '" + secondarypk + "')", function (err, recordset) {
        if (err) console.log("err")

        // send records as a response
        res.json(recordset);
            
    });

});


router.post('/search', async (req, res) =>
{
    var err = '';

    const { filter } = req.body;

    var request = new sql.Request();
    // query to the database and get the records
    request.query("SELECT * FROM [DowntimeEvents_Line1 System 1] WHERE UniqueID LIKE '"+ filter +"%' OR LineID LIKE '"+ filter +"%' OR Machine LIKE '"+ filter +"%' OR ComponentID LIKE '"+ filter +"%' OR Secondarypk LIKE '"+ filter +"%'", function (err, recordset) {
        if (err) console.log(err)

        // send records as a response
        res.json(recordset);

    });

});

module.exports = router;