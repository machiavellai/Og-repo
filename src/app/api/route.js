const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, fullName, subject, message } = req.body;

    if (!email || !fullName || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "oghenevictor54p@gmail.com",
        pass: process.env.SMTP_PASSWORD,
      },
      // For localhost
      // tls: {
      //     // do not fail on invalid certs
      //     rejectUnauthorized: false,
      // },
    });

    const mailOptions = {
      from: email,
      to: "oghenevictor54p@gmail.com",
      replyTo: email,
      subject: `${subject} — Message From victorOghene.com`,
      text: message,
      html: `
                <h1>New message from ${email}</h1>
                <h2>Name:</h2>
                <h3>${fullName}</h3>
                <h2>Subject:</h2>
                <h3>${subject}</h3>
                <h2>Message:</h2>
                <h3>${message}</h3>
            `,
    };

    try {
      // Send email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: "Email sent" });
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.redirect("/");
  }
}
