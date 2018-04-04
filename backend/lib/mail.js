var mailer = require("nodemailer");

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'alih5s522svdevos@ethereal.email',
            pass: 'qpVYh9ANyBzPw1RHh8'
        }
});

var mail = {
    from: "adderNet",
    to: "arpan.pathak47@gmail.com",
    subject: "OTP for new account",
    text: "Your otp is = ",
    html: "<b>Your OTP is</b>"
}

smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " , response);
    }

    smtpTransport.close();
});