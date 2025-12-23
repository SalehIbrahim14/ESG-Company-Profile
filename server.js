const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());

// Route to handle email sending
app.post("/send", async (req, res) => {
  const { name, email, message, phone, service, companyName } = req.body;

  // Path to the Arabic email template
  const templatePath = path.join(__dirname, "email-template.html");

  try {
    fs.readFile(templatePath, "utf8", async (err, html) => {
      if (err) {
        console.error("Error reading HTML file:", err);
        return res.status(500).send("Failed to process email template.");
      }

      // Replace placeholders in the template
      const updatedHtml = html
        .replace("{{name}}", name || "غير متوفر")
        .replace("{{email}}", email || "غير متوفر")
        .replace("{{phone}}", phone || "غير متوفر")
        .replace("{{service}}", service || "غير متوفر")
        .replace("{{companyName}}", companyName || "غير متوفر")
        .replace("{{message}}", message || "غير متوفر");

      const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS
        }
      });

      // Configure email options
      const mailOptions = {
        from: email, // User's email
        to: "your_company@example.com", // Replace with your company email
        subject: `New Message from ${name}`,
        html: updatedHtml,
      };


      await transporter.sendMail(mailOptions);
      res.status(200).send("Message sent successfully!");
    });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).send("Failed to send the message.");
  }
});

// Run the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});