"use client";

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
} from "@/components/ui/alert-dialog";
import { deleteNoteById } from "@/lib/actions/note.action";

import React from "react";

const Alert = ({
  trigger,
  title,
  description,
  action,
  path,
  noteId,
}: {
  trigger: React.ReactElement;
  title: string;
  description: string;
  action: string;
  path?: string | undefined;
  noteId: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="border-none bg-primary-500">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-white/70">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-none bg-red-400">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="border-none bg-black/10"
            onClick={() => deleteNoteById({ id: noteId, path })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
