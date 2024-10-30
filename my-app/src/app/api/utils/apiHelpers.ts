import { NextRequest, NextResponse } from "next/server";

export const submitApplication = async (data: any) =>
fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        url: `${process.env.NEXT_PUBLIC_SUBMIT_ENDPOINT}`,
        data: data,
    }),
});
  
export const uploadResume = async (candidateId: string, applicationFiles: any) =>
fetch(`/api/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        url: `https://harvest.greenhouse.io/v1/candidates/${candidateId}/attachments`,
        data: applicationFiles,
    }),
});

export const sendConfirmationEmail = async (data: any) =>
fetch("/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
});
  
export const toBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {resolve(fileReader.result);};
        fileReader.onerror = (error) => {reject(error);};
    });
};

