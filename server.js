const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const sql = require('mssql');
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) =>
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

//Local
/*
var config = {
    user: 'sa',
    password: '',
    server: 'localhost', 
    database: 'downtime',
    options: {
      enableArithAbort : true
    }
};
*/
//Azure

const config = {
  authentication: {
    options: {
      userName: "azureuser", // update me
      password: "DTeditor!" // update me
    },
    type: "default"
  },
  database : 'mySampleDatabase',
  server: "mysqlservercoke.database.windows.net", // update me
  options: {
    database: "mySampleDatabase", //update me
    encrypt: true,
    enableArithAbort: true
  }
};

sql.connect(config, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected to SQL server')
});

app.use(express.json());

const editedRecordsRouter = require('./backend/routes/editedRecords');
app.use('/editedRecords', editedRecordsRouter);

const userRouter = require('./backend/routes/users');
app.use('/users', userRouter);

const machineRecordsRouter = require('./backend/routes/machineRecords');
app.use('/machineRecords', machineRecordsRouter);



app.post('/API/EditMachine', async (req, res, next) =>
{
    var err = '';
    
    const { ID,startDate, endDate, durationTotalMinutes, lineID, machine, componentID, comments, secondarypk } = req.body;
    
    var request = new sql.Request();
    // query to the database and get the records
    request.query("UPDATE Machines SET StartDateTime = '"+ startDate +"', EndDateTime = '"+ endDate +"', DurationTotalMinutes = '"+ durationTotalMinutes +"', LineID = '"+ lineID +"', Machine = '"+ machine +"', ComponentID = '"+ componentID +"', Comments = '"+ comments +"', Secondarypk = '"+ secondarypk +"' WHERE ID = '"+ ID +"'", function (err, recordset) {
        if (err) console.log(err)

        // send records as a response
        res.json(recordset);
            
    });

  //var ret = { error: err };
  //res.status(200).json(ret);
});


app.post('/API/DeleteMachine', async (req, res, next) =>
{
    var err = '';
    
    const { ID } = req.body;
    
    var request = new sql.Request();
    // query to the database and get the records
    request.query("DELETE FROM Machines WHERE ID = '"+ ID +"'", function (err, recordset) {
        if (err) console.log(err)

        // send records as a response
        res.json(recordset);
            
    });

  //var ret = { error: err };
  //res.status(200).json(ret);
});




app.post('/API/EditUser', async (req, res, next) =>
{
    var err = '';
    
    const { ID, userID, password } = req.body;
    
    var request = new sql.Request();
    // query to the database and get the records
    request.query("UPDATE Users SET UserID = '"+ userID +"', Password = '"+ password +"'", function (err, recordset) {
        if (err) console.log(err)

        // send records as a response
        res.json(recordset);
            
    });

  //var ret = { error: err };
  //res.status(200).json(ret);
});

app.post('/API/SearchUserbyID', async (req, res, next) =>
{
    var err = '';
    
    const { ID, userID } = req.body;
    
    var request = new sql.Request();
    // query to the database and get the records
    request.query("SELECT * FROM Users WHERE ID = '"+ ID +"' OR UserID = '"+ userID +"'", function (err, recordset) {
        if (err) console.log(err)

        // send records as a response
        res.json(recordset);
            
    });

  //var ret = { error: err };
  //res.status(200).json(ret);
});

app.post('/API/DeleteUser', async (req, res, next) =>
{
    var err = '';
    
    const { ID } = req.body;
    
    var request = new sql.Request();
    // query to the database and get the records
    request.query("DELETE FROM Users WHERE ID = '"+ ID +"'", function (err, recordset) {
        if (err) console.log(err)

        // send records as a response
        res.json(recordset);
            
    });

  //var ret = { error: err };
  //res.status(200).json(ret);
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
}); // start Node + Express server on port