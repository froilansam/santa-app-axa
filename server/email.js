const nodemailer = require("nodemailer");

// Transporter configuration
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHERIAL_EMAIL,
    pass: process.env.ETHERIAL_PASSWORD,
  },
});

let pendingRequests = [];

// Function to add requests to the pendingRequests array
const addRequest = (request) => {
  pendingRequests.push(request);
};

// Function to send email with pending requests
const sendEmail = () => {
  if (pendingRequests.length === 0) {
    return;
  }

  // Create the email text
  let emailText = "Pending requests:\n\n";
  for (let request of pendingRequests) {
    emailText += `Username: ${request.username}\n`;
    emailText += `Address: ${request.address}\n`;
    emailText += `Message: ${JSON.stringify(request.message)}\n\n`;
  }

  // Reset the pendingRequests array
  pendingRequests = [];

  let mailOptions = {
    from: "do_not_reply@northpole.com", // sender address
    to: "froilansam@gmail.com", // list of receivers
    subject: "Pending Wish List", // Subject line
    text: emailText, // plain text body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

module.exports = {
  addRequest,
  sendEmail,
};
