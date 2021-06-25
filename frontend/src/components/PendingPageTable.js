import * as React from 'react';
import {Button} from '@material-ui/core'
import {Modal} from 'react-bootstrap'
import {Form, Row, Col} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { buildPath, config } from "./config";
import Grid from "@material-ui/core/Grid";
import {useState} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { sizing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: '30px',
    paddingRight: '30px'
  }
}));

const useStyles1 = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

var temp;
var i;
  
  function PendingPageTable() {

        const classes = useStyles();
        const [rows, setrows] = useState([]);
      
        const record = [];
        
        var DisplayRecords;
      window.onload = DisplayRecords = async () => 
          {
              
              let temp
              await axios.get('http://localhost:5000/editedRecords/pending', config)
              .then((response) => {
                for(var i=0;i<response.data[0].length;i++)
                      {
                        temp = {
                          "id" : response.data[0][i].UniqueID,
                          "LineID" : response.data[0][i].LineID,
                          "Machine" : response.data[0][i].Machine,
                          "ComponentID" : response.data[0][i].ComponentID,
                          "StartDateTime" : response.data[0][i].StartDateTime,
                          "EndDateTime" : response.data[0][i].EndDateTime,
                          "Comments" : response.data[0][i].Comments,
                          "DurationTotalMinutes" : response.data[0][i].DurationTotalMinutes,
                          "Secondarypk" : response.data[0][i].Secondarypk,
                          "Reason" : response.data[0][i].Reason,
                          "Status" : response.data[0][i].Status,
                        }
                        record.push(temp);
                      }
                      setrows(record)
              }, (error) => {
                console.log(error);
              });
          };

        const updateApprove = async (id) => {
              await axios.post(buildPath('editedRecords/edit'), 
              {
                ID: id,
                status: "Approve"
              },config)
                .then((response) => {
                  console.log(response.data)
                  DisplayRecords();
                }, (error) => {
                  console.log(error.request)
                });
            }

            const updateReject = async (id) => {
              await axios.post(buildPath('editedRecords/edit'), 
              {
                ID: id,
                status: "Reject"
              },config)
                .then((response) => {
                  console.log(response.data)
                  DisplayRecords();
                }, (error) => {
                  console.log(error.request)
                });
            }

        const getCard = (rowID) => {
          return(
            <Grid item xs={12} sm={6} md={4} key={rowID}>
          <Card className={classes.root} variant="outlined">
          <CardContent>
          <Box color="white" textAlign="center" fontSize="h5.fontSize" fontWeight="fontWeightRegular" height="100%" width="100%" bgcolor="primary.main" boxShadow={4} borderRadius="borderRadius">
            Pending Request
          </Box>
            <Typography variant="h5" component="h2">
            <br />
              <Box minHeight={35} boxShadow={3} borderRadius="borderRadius"> <strong>ID:</strong> {rows[rowID].id}</Box>
              <Box minHeight={35} boxShadow={3} borderRadius="borderRadius"> <strong>Line ID:</strong> {rows[rowID].LineID}</Box>
              <Box minHeight={35} boxShadow={3} borderRadius="borderRadius"><strong>Machine:</strong> {rows[rowID].Machine}</Box>
              <Box minHeight={35} boxShadow={3} borderRadius="borderRadius"><strong>Component ID:</strong> {rows[rowID].ComponentID}</Box>
              <Box minHeight={35} boxShadow={3} borderRadius="borderRadius"><strong>Start Time:</strong> {rows[rowID].StartDateTime}</Box>
              <Box minHeight={35} boxShadow={3} borderRadius="borderRadius"><strong>End Time:</strong> {rows[rowID].EndDateTime}</Box>
              <Box minHeight={35} boxShadow={3} borderRadius="borderRadius"><strong>Comments:</strong> {rows[rowID].Comments}</Box>
              <Box minHeight={35} boxShadow={3} borderRadius="borderRadius"><strong>Total Minutes:</strong> {rows[rowID].DurationTotalMinutes}</Box>
              <Box minHeight={35} boxShadow={3} borderRadius="borderRadius"><strong>Secondarypk:</strong> {rows[rowID].Secondarypk}</Box>
              <Box minHeight={35} boxShadow={3} borderRadius="borderRadius"><strong>Reason:</strong> {rows[rowID].Reason}</Box>
              <Box minHeight={35} boxShadow={3} borderRadius="borderRadius"><strong>Status:</strong> {rows[rowID].Status}</Box> 
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" size="medium" variant="contained" onClick={ () => updateApprove(rows[rowID].id)}>
              Approve
              </Button>
            <Button color="secondary" size="medium" variant="contained" onClick={ () => updateReject(rows[rowID].id)}>
              Reject
            </Button>
          </CardActions>
        </Card>
        </Grid>
          );};
          
      return (
      <div>
    
    <br></br>
    <div style={{ height: 800, width: '100%' }} >
    <div><h3>
      <center>Pending Records</center>
      </h3></div>
  
      <Grid container spacing={4} className={classes.gridContainer}>
        
      {Object.keys(rows).map(rowID =>
          
          getCard(rowID))}
      
        </Grid>
   
    </div>
    
    </div>
    );
  }export default PendingPageTable;