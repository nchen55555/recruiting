"use client"

import Application from '@/components/application'; 
import { useRouter } from "next/navigation" 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import * as React from 'react';

import {
  submitApplication,
  uploadResume,
  sendConfirmationEmail,
  toBase64,
} from "@/app/api/utils/apiHelpers";
 
/* 
Form schema that defines the inputs required in the application 
*/ 
const formSchema = z.object({
  first_name: z.string().nonempty("First name is required"), 
  last_name: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  phone: z.string().nonempty("Phone number is required"),
  resume: typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
})
 


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

  const onSubmit = async (values: z.infer<typeof formSchema>) => { // this is an event handler 
    try{
      const base64 = await toBase64(values?.resume[0] as Blob);
      const data ={"first_name": values.first_name,"last_name": values.last_name, "email_addresses":[{"value": values.email, "type": "work"}], "phone_numbers": [{"value": values.phone, "type": "work"}], "applications": [{"job_id": 4285367007, "attachments": []}]}
      const application_files = {"filename" : values.resume[0].name, "type" : "resume", "content" : base64, "content_type" : "application/pdf"}
      const initial_app_response = await submitApplication(data);
      if (!initial_app_response.ok) throw new Error("Failed to submit application");
      const responseData = await initial_app_response.json(); 
      const resume_app_response = await uploadResume(responseData.data.id, application_files);
      if (!resume_app_response.ok) throw new Error("Failed to upload resume");
      const email_response = await sendConfirmationEmail(responseData);
      if(!email_response.ok) throw new Error("Failed to send email");
      router.push("/success");
    }
    catch (error) {
      console.error(error);
      router.push("/error");
    }
  }
  const fileRef = form.register("resume");
  return <Application form={form} onSubmit={onSubmit} fileRef={fileRef} />;
}