const express = require('express')
const router = express.Router()
const sql = require('mssql');

const verifyAuthToken = require("../middleware/authenticate");

//set templinenumber to case of table you want 

router.post('/', verifyAuthToken, async (req, res) =>
{
    const { lineNumber} = req.body
    var request = new sql.Request(); 
   switch (lineNumber) {

       //system 1 line 1
        case 11:
            // query to the database and get the records
            request.query(`SELECT UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk FROM [DowntimeEvents_Line1 System 1]`, function (err, recordset) {
                if (err) console.log(err)

                var temp = recordset;
                  
                for(var i = 0; i < temp.recordsets[0].length; i++){
                    temp.recordsets[0][i].id = temp.recordsets[0][i].UniqueID;
                    delete temp.recordsets[0][i].UniqueID;
                }
                res.json(temp)      
            });  
            break;

        //system 1 line 2
        case 12:
            request.query("SELECT UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk FROM [DowntimeEvents_Line2 System 1]", function (err, recordset) {
                if (err) console.log(err)

                var temp = recordset;
                  
                for(var i = 0; i < temp.recordsets[0].length; i++){
                    temp.recordsets[0][i].id = temp.recordsets[0][i].UniqueID;
                    delete temp.recordsets[0][i].UniqueID;
                }
                res.json(temp)         
            }); 
            break;

        //system 1 line 3
        case 13:
            request.query("SELECT UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk FROM [DowntimeEvents_Line3 System 1]", function (err, recordset) {
                if (err) console.log(err)
       
                var temp = recordset;
                  
                for(var i = 0; i < temp.recordsets[0].length; i++){
                    temp.recordsets[0][i].id = temp.recordsets[0][i].UniqueID;
                    delete temp.recordsets[0][i].UniqueID;
                }
                res.json(temp)        
            }); 
            break;

        //system 1 line 4
        case 14:
            request.query("SELECT UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk FROM [DowntimeEvents_Line4 System 1]", function (err, recordset) {
                if (err) console.log(err)
           
                var temp = recordset;
                  
                for(var i = 0; i < temp.recordsets[0].length; i++){
                    temp.recordsets[0][i].id = temp.recordsets[0][i].UniqueID;
                    delete temp.recordsets[0][i].UniqueID;
                }
                res.json(temp)        
            }); 
            break;

        //system 1 line 8
        case 18:
            request.query("SELECT UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk FROM [DowntimeEvents_Line5 System 1]", function (err, recordset) {
                if (err) console.log(err) 
        
                var temp = recordset;
                  
                for(var i = 0; i < temp.recordsets[0].length; i++){
                    temp.recordsets[0][i].LineID = 8;
                    temp.recordsets[0][i].id = temp.recordsets[0][i].UniqueID;
                    delete temp.recordsets[0][i].UniqueID;
                }
                res.json(temp)
            }); 
            break;   

        //system 2 line 4
        case 24:
            request.query("SELECT UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk FROM [DowntimeEvents_Line1 System 2]", function (err, recordset) {
                if (err) console.log(err)
               
                var temp = recordset;
                  
                for(var i = 0; i < temp.recordsets[0].length; i++){
                    temp.recordsets[0][i].LineID = 4;
                    temp.recordsets[0][i].id = temp.recordsets[0][i].UniqueID;
                    delete temp.recordsets[0][i].UniqueID;
                }
                res.json(temp)      
            }); 
            break;   

        //system 2 line 5
        case 25:
            request.query("SELECT UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk FROM [DowntimeEvents_Line2 System 2]", function (err, recordset) {
                if (err) console.log(err)
                
                var temp = recordset;
                  
                for(var i = 0; i < temp.recordsets[0].length; i++){
                    temp.recordsets[0][i].LineID = 5;
                    temp.recordsets[0][i].id = temp.recordsets[0][i].UniqueID;
                    delete temp.recordsets[0][i].UniqueID;
                }
                res.json(temp)         
            }); 
            break;   

        //system 2 line 7
        case 27:
            request.query("SELECT UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk FROM [DowntimeEvents_Line3 System 2]", function (err, recordset) {
                if (err) console.log(err)
                       
                var temp = recordset;
                  
                for(var i = 0; i < temp.recordsets[0].length; i++){
                    temp.recordsets[0][i].LineID = 7;
                    temp.recordsets[0][i].id = temp.recordsets[0][i].UniqueID;
                    delete temp.recordsets[0][i].UniqueID;
                }
                res.json(temp)       
            }); 
            break;  

        //system 2 line 9
        case 29:
            request.query("SELECT UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk FROM [DowntimeEvents_Line4 System 2]", function (err, recordset) {
                if (err) console.log(err)
                           
                var temp = recordset;
                  
                for(var i = 0; i < temp.recordsets[0].length; i++){
                    temp.recordsets[0][i].LineID = 9;
                    temp.recordsets[0][i].id = temp.recordsets[0][i].UniqueID;
                    delete temp.recordsets[0][i].UniqueID;
                }
                res.json(temp)        
            }); 
            break; 

        //system 2 line 6
        case 26:
            request.query("SELECT UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk FROM [DowntimeEvents_Line5 System 2]", function (err, recordset) {
                if (err) console.log(err)
                               
                var temp = recordset;
                  
                for(var i = 0; i < temp.recordsets[0].length; i++){
                    temp.recordsets[0][i].LineID = 6;
                    temp.recordsets[0][i].id = temp.recordsets[0][i].UniqueID;
                    delete temp.recordsets[0][i].UniqueID;
                }
                res.json(temp)         
            }); 
            break; 
        
        default:
            request.query("SELECT UniqueID, pkDowntimeEventID, StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk FROM [DowntimeEvents_Line1 System 1]", function (err, recordset) {
                if (err) console.log(err)

                res.json(recordset)     
            }); 
}
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
