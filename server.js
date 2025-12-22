const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { log } = require("console");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());

// Route to handle email sending
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
// Looking to send emails in production? Check out our Email API/SMTP product!
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const TOKEN = "deea318212c894088de62334e86b96cf";

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    sandbox: true,
    testInboxId: 1624851,
  })
);

const sender = {
  address: "hello@example.com",
  name: "Mailtrap Test",
};
const recipients = [
  "saleh4536217890@gmail.com",
];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(res.status(200).send("Message sent successfully!"), res.status(500).send("Failed to send the message."));

  // Create a transporter using Mailtrap credentials
  // const transporter = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 25,
  //   auth: {
  //     user: "15c07d0cd0e19d", //process.env.MAILTRAP_USER, // Replace with your Mailtrap username
  //     pass: "9f621c7ec1dbb2", //process.env.MAILTRAP_PASS // Replace with your Mailtrap password
  //   }
  // });

  // console.log('transporter: ', transporter);


  // // Configure email options
  // const mailOptions = {
  //   from: email, // User's email
  //   to: "your_company@example.com", // Replace with your company email
  //   subject: `New Message from ${name}`,
  //   text: message
  // };

  // try {
  //   // Send the email
  //   await transporter.sendMail(mailOptions);
  //   res.status(200).send("Message sent successfully!");
  // } catch (error) {
  //   console.error("Error sending email: ", error);
  //   res.status(500).send("Failed to send the message.");
  // }
});

// Run the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});