require("dotenv").config();
const sgMail = require('@sendgrid/mail');
const sql = require('mssql');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailAddr = [];

const FindRecipients = async() => {
    emailAddr.length = 0;
    var privledge = 3;
    try{
    var request = new sql.Request();
    request.query("SELECT Email FROM Employees WHERE Privledge = '"+ privledge +"'", async function(err, recordset){
        for(var i=0;i<recordset.recordsets[0].length;i++)
        {
            emailAddr.push(recordset.recordsets[0][i].Email);
        }
        SendNotification();
        })   
    }catch(err){
        
    }     
}

const SendNotification = async() => {
    
    const msg = {
        to: emailAddr,
        from: 'lis.downtime.editor.test@gmail.com',
        subject: 'LIS-Downtime-Editor Submission',
        text: 'A record has been Edited and its status is pending approval.'
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
        text: 'To reset your password please provide the following code: '+user.code
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