import { NextResponse, NextRequest } from 'next/server'
import { emailTemplate } from '@/components/email-template';

/* eslint-disable-next-line @typescript-eslint/no-require-imports */
const nodemailer = require('nodemailer');

/**
 * Sends an email confirmation to the user upon application submission.
 * @param {NextRequest} data - data from GreenHouse response after adding a candidate.
 * @returns {NextResponse} - Response json for success or failure 
 */
export async function POST(req: NextRequest) {
    // Sender password and username for email 
    const username = `${process.env.NEXT_PUBLIC_BURNER_USERNAME}`;
    const password = `${process.env.NEXT_PUBLIC_BURNER_PASSWORD}`;
    const body = await req.json();

    // Candidate information for email 
    const email = body.data.email_addresses[0].value;
    const first_name = body.data.first_name;
    const last_name = body.data.last_name;
    const phone_number = body.data.phone_numbers[0].value;
    const candidate_id = body.data.id;
    
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
          html: emailTemplate({first_name, last_name, email, phone_number, candidate_id,
          }),
      })
      console.log("Mail response:", mail);

      return NextResponse.json({ message: "Success: email was sent", status: 201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Unable to send email", status: 500})
    }
  }
