import { text } from "stream/consumers";
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req) {
  const body = await text(req.body);
  const data = JSON.parse(body);

  console.log(data);

  if (!data.email || !data.fullName || !data.subject || !data.message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
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
    from: data.email,
    to: "oghenevictor54p@gmail.com",
    replyTo: data.email,
    subject: `${data.subject} — Message From victorOghene.com`,
    text: data.message,
    html: `
              <h1>New message from ${data.email}</h1>
              <h2>Name:</h2>
              <h3>${data.fullName}</h3>
              <h2>Subject:</h2>
              <h3>${data.subject}</h3>
              <h2>Message:</h2>
              <h3>${data.message}</h3>
          `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
