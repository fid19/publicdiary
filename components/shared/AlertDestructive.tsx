import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDestructive({ message }: { message: string | undefined }) {
  return (
    <Alert className="bg-red-100" variant="destructive">
      <AlertCircle className="mt-1 size-4" />
      <AlertTitle className="text-[18px] font-medium">Error</AlertTitle>
      <AlertDescription className="text-[18px] font-medium">
        {message}
      </AlertDescription>
    </Alert>
  );
}
