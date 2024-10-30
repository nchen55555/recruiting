"use client"
import { RocketIcon } from "@radix-ui/react-icons"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
 
export default function SuccessPage() {
  return (
    <div className="p-4">
        <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
            Check Your Email for the Confirmation! 
        </AlertDescription>
        </Alert>
    </div>
  )
}
