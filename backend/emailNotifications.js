require("dotenv").config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
    to: 'craigabaron@gmail.com',
    from: 'lis.downtime.editor@gmail.com',
    subject: 'A record has been submitted for review on the LIS Downtime Editor',
    text: 'Sendgrid is awesome!'
}

const Sendemail = async() => {

    sgMail.send(msg, function(err, info) {
        if(err){
            console.log("Email Not Sent");
        }
        else {
            console.log("Email Sent Success");
        }
    })
}

