"use client"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { useRouter } from 'next/navigation'; // For App Router
import { Button } from "@/components/ui/button"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
 
export default function ErrorAlert() {
  const router = useRouter();
  return (
    <div className="p-4">
      <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Form submission did not go through. Please check and validate your inputs again. 
      </AlertDescription>
      <Button variant="link" onClick={() => router.back()}>Back to Application</Button>
    </Alert>
    </div>
  )
}
