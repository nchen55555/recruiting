"use client"
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
/**
 * Application Form
 * Renders the application form 
 */

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const Application = ({ form, onSubmit, fileRef }: any) => (
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
); 

export default Application; 
