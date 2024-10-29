import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend("");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await resend.emails.send({
    from: 'Nicole <nicole_chen@college.harvard.edu>',
    to: [req.body.data.email_addresses[0].value],
    subject: 'Hello world',
    react: EmailTemplate({ firstName: req.body.data.first_name}),
  });

  if (error) {
    return res.status(400).json(error);
  }
  res.status(200).json(data);
};


