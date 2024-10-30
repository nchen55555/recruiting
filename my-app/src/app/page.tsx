"use client"
import { useRouter } from "next/navigation" // redirects the user to main page after submission 
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
const formSchema = z.object({
  first_name: z.string().nonempty("First name is required"), 
  last_name: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  phone: z.string().nonempty("Phone number is required"),
  resume: typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
})
 

export default function ProfileForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "", 
      last_name: "",
      email: "",
      phone: "",
      resume: z.instanceof(FileList)
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => { // this is an event handler 
    const base64 = await toBase64(values?.resume[0] as Blob);
    const data ={"first_name": values.first_name,"last_name": values.last_name, "email_addresses":[{"value": values.email, "type": "work"}], "phone_numbers": [{"value": values.phone, "type": "work"}], "applications": [{"job_id": 4285367007, "attachments": []}]}
    const application_files = {"filename" : values.resume[0].name, "type" : "resume", "content" : base64, "content_type" : "application/pdf"}
    var errored = true;
    console.log(JSON.stringify(data));
    const initial_app_response = await fetch("api/submit", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (initial_app_response.ok) { // Check if the response is successful
      const responseData = await initial_app_response.json(); // Parse the JSON response
      const resume_app_response = await fetch("api/resume", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({url:`https://harvest.greenhouse.io/v1/candidates/${responseData.data.id}/attachments`, application: application_files}),
      });
      if(resume_app_response.ok){
        console.log(responseData); // Access the data returned from the server
        console.log(responseData.data.email_addresses[0].value); // Access the data returned from the server
        const email_response = await fetch("api/send", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(responseData)
        });
        if(email_response.ok){
          console.log("success");
          errored = false;
        }
      }
    }
    if(!errored){
      router.push('/success');
    }
    else{
      router.push('/error');
    }
  };

  const toBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      
      if (file) {
        fileReader.readAsDataURL(file);
      }
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const fileRef = form.register("resume");

  return (
    <div className="p-4">
      <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} className="max-w-96" />
              </FormControl>
              <FormDescription>
                Please Input Your Legal First Name 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )
        }
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} className="max-w-96" />
              </FormControl>
              <FormDescription>
                Please Input Your Legal Last Name 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )
        }
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} className="max-w-96" />
              </FormControl>
              <FormDescription>
                Please Input Your School/Work Email 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )
        }
        />
         <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" {...field} className="max-w-96" />
              </FormControl>
              <FormDescription>
                Please Input A Valid Personal Phone Number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )
        }
        />
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume File Upload</FormLabel>
              <FormControl>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input type="file" {...fileRef} onChange={(event) => {field.onChange(event.target?.files?.[0] ?? undefined);}}/>
              </div>
              </FormControl>
              <FormDescription>
                Please Upload Your Most Updated Resume
              </FormDescription>
              <FormMessage />
            </FormItem>
          )
        }
        />
        {/* <Button type="submit">Submit</Button> */}
        <AlertDialog>
        <AlertDialogTrigger className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-gray-800">Submit</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Submit Your Application?</AlertDialogTitle>
              <AlertDialogDescription>
                Your application will only be considered once. Please double check all your information is correctly filled out! 
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
    </div>
  )
}