const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

// البرمجيات الوسيطة
app.use(cors()); // السماح بالطلبات عبر المصادر
app.use(bodyParser.json());

// مسار لمعالجة إرسال البريد الإلكتروني
app.post("/send", async (req, res) => {
  const { name, email, message, phone, service, companyName } = req.body;

  // المسار إلى قالب البريد الإلكتروني العربي
  const templatePath = path.join(__dirname, "email-template.html");

  try {
    fs.readFile(templatePath, "utf8", async (err, html) => {
      if (err) {
        console.error("خطأ في قراءة ملف HTML:", err);
        return res.status(500).send("فشلت معالجة قالب البريد الإلكتروني.");
      }

      // استبدال العناصر النائبة في القالب
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

      // تكوين خيارات البريد الإلكتروني
      const mailOptions = {
        from: email, // البريد الإلكتروني للمستخدم
        to: "your_company@example.com", // استبدل ببريدك الإلكتروني للشركة
        subject: `رسالة جديدة من ${name}`,
        html: updatedHtml,
      };


      await transporter.sendMail(mailOptions);
      res.status(200).send("تم إرسال الرسالة بنجاح!");
    });
  } catch (error) {
    console.error("خطأ في إرسال البريد الإلكتروني: ", error);
    res.status(500).send("فشل إرسال الرسالة.");
  }
});

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});