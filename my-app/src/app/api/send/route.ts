import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');

// Handles POST requests to /api

export async function POST(req: NextRequest) {
    const username = "nchen55555@gmail.com" // process.env.NEXT_PUBLIC_BURNER_USERNAME;
    const password = "bpwrwdhzhzyslnzv"// process.env.NEXT_PUBLIC_BURNER_PASSWORD;
    const body = await req.json();
    const email = body.data.email_addresses[0].value;
    const first_name = body.data.first_name;
    const last_name = body.data.last_name;
    const phone_number = body.data.phone_numbers[0].value;
    const candidate_id = body.data.id;
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
          Hey ${first_name}! 
          
          
          <p> Thank you for applying to Paraform. We appreciate your interest and wanted to confirm that we have received your application with the following information: </p>
          <p> First Name: ${first_name} </p>
          <p> Last Name: ${last_name} </p>
          <p> Email: ${email} </p>
          <p> Phone Number: ${phone_number} </p>
          <p> Candidate ID: ${candidate_id} </p>

          <p> If this information does not match what you intended to submit, please respond back to this email with the corrections! </p>

          <p> Best, </p>

          <p> Paraform Recruiting Team </p>
          `,
      })
      console.log("Mail response:", mail);


      return NextResponse.json({ message: "Success: email was sent", status: 201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "COULD NOT SEND MESSAGE", status: 500})
    }
  }
