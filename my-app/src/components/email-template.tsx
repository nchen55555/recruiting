type EmailTemplateProps = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  candidate_id: string;
};

/**
 * Email Template
 * HTML for the email template that is sent to candidates
 */
export function emailTemplate({
  first_name,
  last_name,
  email,
  phone_number,
  candidate_id,
}: EmailTemplateProps): string {
  return `
    Hey ${first_name}!

    <p>Thank you for applying to Paraform. We appreciate your interest and wanted to confirm that we have received your application with the following information:</p>
    <p><strong>First Name:</strong> ${first_name}</p>
    <p><strong>Last Name:</strong> ${last_name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone Number:</strong> ${phone_number}</p>
    <p><strong>Candidate ID:</strong> ${candidate_id}</p>

    <p>If this information does not match what you intended to submit, please respond back to this email with the corrections! We will reach back out to you if there is mutual interest within the next week. </p>

    <p>Best,</p>
    <p>Paraform Recruiting Team</p>
  `;
}