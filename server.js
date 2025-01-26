require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Ruta za slanje email-a
app.post("/send-email", async (req, res) => {
  const { name, email, field } = req.body;

  if (!name || !email || !field) {
    return res.status(400).send("All fields are required.");
  }

  try {
    // Konfigurisanje Nodemailer transportera
    const transporter = nodemailer.createTransport({
      service: "gmail", // Možeš koristiti druge servise
      auth: {
        user: process.env.EMAIL, // Email adresa sa koje šalješ
        pass: process.env.PASSWORD, // Lozinka ili App Password
      },
    });

    // Email sadržaj
    const mailOptions = {
      from: email,
      to: "delicdevelopment@gmail.com",
      subject: `Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${field}`,
    };

    // Slanje email-a
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
