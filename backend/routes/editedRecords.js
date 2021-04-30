const express = require('express')
const router = express.Router()
const sql = require('mssql');

//get all records
router.get('/', async (req, res) => {
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
router.post('/add', (req, res) => {
  
})
//delete record
router.delete('/:id', (req, res) => {

})

module.exports = router