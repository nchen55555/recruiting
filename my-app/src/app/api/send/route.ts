import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');

// Handles POST requests to /api

export async function POST(req: NextRequest) {
    const username = "nchen55555@gmail.com" // process.env.NEXT_PUBLIC_BURNER_USERNAME;
    const password = "bpwrwdhzhzyslnzv"// process.env.NEXT_PUBLIC_BURNER_PASSWORD;
    const body = await req.json();
    const email = body.data.email_addresses[0].value;
    const name = body.data.first_name;
    console.log("Inside Email Sender", body, username, password)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false,
      },

      auth: {
          user: username,
          pass: password
      }
    });

    try {
      const mail = await transporter.sendMail({
          from: username,
          to: email,
          subject: `Thank you for your application!`,
          html: `
          Hey ${name}! 
          
          Thank you for applying to Paraform. We appreciate your interest and wanted to confirm that we have received your application with the following information: 

          `,
      })
      console.log("Mail response:", mail);


      return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "COULD NOT SEND MESSAGE", status: 500})
    }
  }
