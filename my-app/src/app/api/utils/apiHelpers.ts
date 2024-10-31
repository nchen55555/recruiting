/**
 * Redirects to submit application logic 
 * @param {NextRequest} data - data from application form.
 */
export const submitApplication = async (data: Record<string, unknown>) =>
fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        url: `${process.env.NEXT_PUBLIC_SUBMIT_ENDPOINT}`,
        data: data,
    }),
});

/**
 * Redirects to add resume attachment to the user's profile 
 * @param {string, Record} candidateId applicationFiles - specific string for the candidate ID to customize the endpoint URL and the actual attachment data.
 */
export const uploadResume = async (candidateId: string, applicationFiles: Record<string, unknown>) =>
fetch(`/api/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        url: `https://harvest.greenhouse.io/v1/candidates/${candidateId}/attachments`,
        data: applicationFiles,
    }),
});

/**
 * Redirects to send email confirmation 
 * @param {NextRequest} data - data from application form.
 */
export const sendConfirmationEmail = async (data: Record<string, unknown>) =>
fetch("/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
});
  
/**
 * Converts file submitted from form into Base 64 encoding (proper formatting) to send to GreenHouse endpoint
 * @param {NextRequest} file - file from application form.
 */
export const toBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {resolve(fileReader.result);};
        fileReader.onerror = (error) => {reject(error);};
    });
};

