import nodemailer from "nodemailer";
// email configuration and send email

// email template
const emailProcessor = async (emailData) => {
  try {
    // create reusable transporter object
    let transporter = nodemailer.createTransport({
      host: process.env.Email_SMTP,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail(emailData);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};
// make sure the email has fName, email and url
export const verificationEmail = (emailData) => {
  console.log(emailData.fName);
  const emailBody = {
    from: '" PK-E-COM 👻" <pradeepdhital@pk.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Email verification instruction", // Subject line
    text: `Hi ${emailData.fName}, please follow the following link to verify your account ${emailData.url}`, // plain text body
    html: `
    <p> Hi ${emailData.fName}</P>
    <p> please follow the following link to confirm your account</P>
    <a href=${emailData.url}>click to verify</a>

    `, // html body
  };
  emailProcessor(emailBody);
};
export const userVerifiedNotification = (emailData) => {
  const emailBody = {
    from: '" PK-E-COM 👻" <pradeepdhital@pk.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Account has been verified", // Subject line
    text: `Hi ${emailData.fName}, Your account has been verified, you may login now ${process.env.ROOT_DOMAIN}`, // plain text body
    html: `
   
    <p> Hi ${emailData.fName}</P>
    <p>Your account has been verified, you may logged in now. </p>
    <a href="${process.env.ROOT_DOMAIN}">click here to go to homepage to login</a>

    `, // html body
  };
  emailProcessor(emailBody);
};
