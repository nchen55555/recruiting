"use client"

import Application from '@/components/application'; 
// import dynamic from 'next/dynamic';
// const Application = dynamic(() => import('@/components/application'));

import { useRouter } from "next/navigation" 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from 'react';
import { z } from "zod"
import * as React from 'react';

import {
  submitApplication,
  uploadResume,
  sendConfirmationEmail,
  toBase64,
} from "@/app/api/utils/apiHelpers";
 
/**
 * Form schema that defines the types of inputs required in the form  
 */
const formSchema = z.object({
  first_name: z.string().nonempty("First name is required"), 
  last_name: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  phone: z.string().nonempty("Phone number is required"),
  resume: typeof window === 'undefined' ? z.any() : z.instanceof(FileList, { message: "The resume must be a valid file" })
})
 
/**
 * Renders the Application Form including the logic for submission 
 */
export default function ApplicationForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "", 
      last_name: "",
      email: "",
      phone: "",
      resume: null,
    },
  });

  // Logic for submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {  
    try{
      setLoading(true);     
      // Converts resume to base64 encoding 
      const base64 = await toBase64(values?.resume[0] as Blob);
      // Reformats form data to conform with GreenHouse API input requirements 
      const data =
      {"first_name": values.first_name,
        "last_name": values.last_name, 
        "email_addresses":[{"value": values.email, "type": "work"}], 
        "phone_numbers": [{"value": values.phone, "type": "work"}], 
        "applications": [{"job_id": process.env.NEXT_PUBLIC_JOB_ID, "attachments": []}]
      }
      // Reformats resume data to conform with GreenHouse API input requirements 
      const application_files = 
      {"filename" : values.resume[0].name, 
        "type" : "resume", 
        "content" : base64, 
        "content_type" : "application/pdf"
      }
      // Sends initial api request to submit the application and add candidate 
      const initial_app_response = await submitApplication(data);
      if (!initial_app_response.ok) throw new Error("Failed to submit application");
      const responseData = await initial_app_response.json(); 

      // Sends second api request to add resume attachment to candidate's profile using candidate id from the previous 
      // response's data 
      const resume_app_response = await uploadResume(responseData.data.id, application_files);
      if (!resume_app_response.ok) throw new Error("Failed to upload resume");
      const email_response = await sendConfirmationEmail(responseData);

      // Sends email confirmation to candidate
      if(!email_response.ok) throw new Error("Failed to send email");
      router.push("/success");
    }
    catch (error) {
      console.error(error);
      setLoading(false);  
      router.push("/error");
    }
  }
  const [loading, setLoading] = useState(false); // Loading state
  const fileRef = form.register("resume");
  return <Application loading= {loading} form={form} onSubmit={onSubmit} fileRef={fileRef} />;
}