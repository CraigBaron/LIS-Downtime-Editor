const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const sql = require('mssql');
const PORT = process.env.PORT || 5000;
const path = ('path');
app.use(cors());
app.use(bodyParser.json());

// Serve Static assests if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); // change this if your dir structure is different
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
}); // start Node + Express server on port