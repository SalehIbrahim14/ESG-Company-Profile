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
  const { name, email, message, phone, service, companyName, lang } = req.body;

  // Determine language (default to Arabic if not specified)
  const language = lang || "ar";
  
  // Select appropriate email template based on language
  const templateFileName = language === "en" ? "email-template-en.html" : "email-template.html";
  const templatePath = path.join(__dirname, templateFileName);

  try {
    fs.readFile(templatePath, "utf8", async (err, html) => {
      if (err) {
        console.error("Error reading HTML file:", err);
        return res.status(500).send("Failed to process email template.");
      }

      // Replace placeholders in template
      const updatedHtml = html
        .replace("{{name}}", name || "N/A")
        .replace("{{email}}", email || "N/A")
        .replace("{{phone}}", phone || "N/A")
        .replace("{{service}}", service || "N/A")
        .replace("{{companyName}}", companyName || "N/A")
        .replace("{{message}}", message || "N/A");

      const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS
        }
      });

      // Configure email options
      const subjectPrefix = language === "en" ? "New message from" : "رسالة جديدة من";
      const mailOptions = {
        from: email, // User's email
        to: "your_company@example.com", // Replace with your company email
        subject: `${subjectPrefix} ${name}`,
        html: updatedHtml,
      };


      await transporter.sendMail(mailOptions);
      const successMessage = language === "en" ? "Message sent successfully!" : "تم إرسال الرسالة بنجاح!";
      res.status(200).send(successMessage);
    });
  } catch (error) {
    console.error("Error sending email: ", error);
    const errorMessage = language === "en" ? "Failed to send message." : "فشل إرسال الرسالة.";
    res.status(500).send(errorMessage);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});