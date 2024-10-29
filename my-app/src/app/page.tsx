// "use client" // tells next js that this is a client component 

// import {Input} from "@nextui-org/react";

// import { useRouter } from "next/navigation" // redirects the user to main page after submission 

// import { useState, FormEvent} from "react" // state for different inputs (title, priority, etc)]


// export default function Home() {
//   const router = useRouter() 

//   const [application, setApplication] = useState({ first_name: "", last_name: "", email: "", phone: ""});
//   const [isLoading, setLoading] = useState(false)

//   const data = {
//     first_name: "John",
//     last_name: "Locke",
//     company: "The Tustin Box Company",
//     title: "Customer Success Representative",
//     is_private: false,
//     applications: [
//         {
//             job_id: 4285367007
//         }
//     ]
//   };


//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault(); // prevent default action of a form which is to refresh a page 
//     setLoading(true);
//     const response = await fetch("api/submit", {
//       method: "POST",
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     console.log(response);
//   }
//   return (
//     <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//       <Input type="email" label="Email" />
//       <Input type="email" label="Email" placeholder="Enter your email" />
//     </div>
//     // <form onSubmit={handleSubmit}>
//     //   <label >First name:</label>
//     //   <input type="text" id="first" name="first" required onChange={(e) => setName(e.target.value)} value={name} />
//     //   <label >Last name:</label>
//     //   <input type="text" id="last" name="last" />
//     //   <button disabled={isLoading}>
//     //     {isLoading ? <span>Submitting Application...</span> : <span>Submit Application</span>}
//     //   </button>
//     // </form>
//   );
// }

"use client"
import { useRouter } from "next/navigation" // redirects the user to main page after submission 

import { useState, FormEvent} from "react" // state for different inputs (title, priority, etc)]
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import * as React from 'react';


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
  first_name: z.string(), 
  last_name: z.string(),
  email: z.string(),
  phone: z.string(),
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
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => { // this is an event handler 
    console.log(values);
    const data ={"first_name": values.first_name,"last_name": values.last_name, "phone_numbers": [{"value": values.phone, "type": "work"}], "applications": [{"job_id": 4285367007}]}
    // const data = {
    //     first_name: values.first_name,
    //     last_name: values.last_name,
    //     phone_numbers: [
    //         {
    //         "value": values.phone,
    //         }
    //     ],
    //     email_addresses: [
    //         {
    //         "value": values.email
    //         }
    //     ],
    //     applications: [
    //         {
    //         "job_id": 4285367007
    //         }
    //     ]
    // };
    console.log(JSON.stringify(data));
    const response = await fetch("api/submit", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log(response);
    if (response.status != 201) {
      router.push('/error'); // Redirect to the error route
    }
    else{
      // retrieve the application
    }
  };

  return (
    <div className="p-4">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                Please Input A Valid Phone Number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )
        }
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}