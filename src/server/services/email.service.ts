/**
 * This service file contains the logic for sending emails.
 * It uses the `nodemailer` library to send emails.
 * It also contains a function that adds a request to an array of pending requests.
 * It also contains a function that sends an email containing all pending requests.
 * This file is used to send emails in a Santa app.
 */

import nodemailer from "nodemailer";
import { ISantaPendingRequest } from "../../types/SantaFormField.types";

const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHERIAL_EMAIL,
    pass: process.env.ETHERIAL_PASSWORD,
  },
});

let pendingRequests: ISantaPendingRequest[] = [];

const addRequest = (request: ISantaPendingRequest) => {
  pendingRequests.push(request);
};

const sendEmail = () => {
  if (pendingRequests.length === 0) {
    return;
  }

  let emailText = "Pending requests:\n\n";
  for (let request of pendingRequests) {
    emailText += `Username: ${request.username}\n`;
    emailText += `Address: ${request.address}\n`;
    emailText += `Message: ${JSON.stringify(request.message)}\n\n`;
  }

  pendingRequests = [];

  let mailOptions = {
    from: "do_not_reply@northpole.com",
    to: "santa@northpole.com",
    subject: "Pending Wish List",
    text: emailText,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

export { addRequest, sendEmail };
