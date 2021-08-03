require("dotenv").config();
const sgMail = require('@sendgrid/mail');
const sql = require('mssql');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailAddr = [];

const FindRecipients = async() => {
    emailAddr.length = 0;
    const superUser = 3;
    const manager = 2;
    
    var request = new sql.Request();
    request.query("SELECT Email FROM Employees WHERE Privledge = '"+ superUser + "' OR Privledge = '"+manager+"'", async function(err, recordset){
        for(var i=0;i<recordset.recordsets[0].length;i++)
        {
            emailAddr.push(recordset.recordsets[0][i].Email);
        }
        console.log(emailAddr)
        SendNotification();
        })   
      
}

const SendNotification = async() => {
    
    const msg = {
        to: emailAddr,
        from: 'lis.downtime.editor.test@gmail.com',
        subject: 'LIS-Downtime-Editor Submission',
        text: 'A record has been Edited and its status is pending approval.',
        html : 'A record has been Edited and its status is pending approval. <a href="http://listest.eastus.cloudapp.azure.com/PendingPage">Click here</a> to view these records.'
    }

    sgMail.sendMultiple(msg, function(err, info) {
        if(err){
            console.log("Email Not Sent");
        }
        else {
            console.log("Email Sent Success");
        }
    })
}

const SendCode = (user) => {

    const msg = {
        to: user.email,
        from: 'lis.downtime.editor.test@gmail.com',
        subject: 'LIS-Downtime-Editor Reset Password',
        text: 'To reset your password please provide the following code: '+user.code+' This code expires in 10 mins.'
    }

    sgMail.send(msg, function(err, info) {
        if(err){
            console.log("Email Not Sent");
        }
        else {
            console.log("Email Sent Success");
        }
    })
    


}

module.exports.FindRecipients = FindRecipients;
module.exports.SendCode = SendCode;