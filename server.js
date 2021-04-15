const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const sql = require('mssql');

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

var config = {
    user: 'sa',
    password: 'Feb501998!',
    server: 'localhost', 
    database: 'downtime' 
};

sql.connect(config, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected to SQL server')
});

app.get('/API/Test', function (req, res) {
    // create Request object
    var request = new sql.Request();
           
    // query to the database and get the records
    request.query('select * from Inventory', function (err, recordset) {
            
        if (err) console.log(err)

        // send records as a response
        res.json(recordset);
            
    });
});

app.post('/API/AddMachine', async (req, res, next) =>
{
    var err = '';
    
    const { startDate, endDate, durationTotalMinutes, lineID, machine, componentID, comments, secondarypk } = req.body;
    
    var request = new sql.Request();
    // query to the database and get the records
    request.query("INSERT INTO Machines (StartDateTime, EndDateTime, DurationTotalMinutes, LineID, Machine, ComponentID, Comments, Secondarypk) VALUES ('" + startDate + "','" + endDate + "','" + durationTotalMinutes + "','" + lineID + "','" + machine + "','" + componentID + "', '" + comments + "', '" + secondarypk + "')", function (err, recordset) {
        if (err) console.log(err)

        // send records as a response
        res.json(recordset);
            
    });

  //var ret = { error: err };
  //res.status(200).json(ret);
});

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

app.post('/API/SearchMachine', async (req, res, next) =>
{
    var err = '';
    
    const { lineID, machine, secondarypk } = req.body;
    
    var request = new sql.Request();
    // query to the database and get the records
    request.query("SELECT * FROM Machines WHERE LineID = '"+ lineID +"' OR Secondarypk = '"+ secondarypk +"'  OR machine = '"+ machine +"'", function (err, recordset) {
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

app.post('/API/LoginUser', async (req, res, next) =>
{
    var err = '';
    
    const { userID,password } = req.body;
    
    var request = new sql.Request();
    // query to the database and get the records
    request.query("SELECT * FROM Users WHERE ID = '"+ ID +"' AND Password = '"+ password +"'", function (err, recordset) {
        if (err) console.log(err)

        // send records as a response
        res.json(recordset);
            
    });

  //var ret = { error: err };
  //res.status(200).json(ret);
});

app.post('/API/AddUser', async (req, res, next) =>
{
    var err = '';
    
    const { userID, password } = req.body;
    
    var request = new sql.Request();
    // query to the database and get the records
    request.query("INSERT INTO Users (UserID, Password) VALUES ('" + userID + "','" + password + "')", function (err, recordset) {
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

var server = app.listen(5000, function () {
    console.log('Server is running..');
});