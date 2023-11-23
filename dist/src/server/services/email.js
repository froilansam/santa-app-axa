"use strict";
/**
 * This service file contains the logic for sending emails.
 * It uses the `nodemailer` library to send emails.
 * It also contains a function that adds a request to an array of pending requests.
 * It also contains a function that sends an email containing all pending requests.
 * This file is used to send emails in a Santa app.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.addRequest = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: process.env.ETHERIAL_EMAIL,
        pass: process.env.ETHERIAL_PASSWORD,
    },
});
let pendingRequests = [];
const addRequest = (request) => {
    pendingRequests.push(request);
};
exports.addRequest = addRequest;
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
exports.sendEmail = sendEmail;
