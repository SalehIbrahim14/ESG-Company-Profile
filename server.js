const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());

// Route to handle email sending
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter using Mailtrap credentials
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "<YOUR_MAILTRAP_USER>", // Replace with your Mailtrap username
      pass: "<YOUR_MAILTRAP_PASSWORD>" // Replace with your Mailtrap password
    }
  });

  // Configure email options
  const mailOptions = {
    from: email, // User's email
    to: "your_company@example.com", // Replace with your company email
    subject: `New Message from ${name}`,
    text: message
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).send("Failed to send the message.");
  }
});

// Run the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});