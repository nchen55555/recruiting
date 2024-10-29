"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ErrorMessage() {
  return(
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Error Submitting Application</AlertTitle>
      <AlertDescription>
        Please try again and verify your inputs are correct! 
      </AlertDescription>
    </Alert>
  );
}
