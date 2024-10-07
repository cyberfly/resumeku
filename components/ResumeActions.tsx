"use client";

import { Button } from "@/components/ui/button";
import { Edit, Download, Copy, Trash } from "lucide-react";
import { duplicateResume } from "@/lib/actions";

interface ResumeActionsProps {
  resumeId: string;
}

export default function ResumeActions({ resumeId }: ResumeActionsProps) {
  const handleDuplicate = async () => {
    try {
      await duplicateResume(resumeId);
      // You might want to add some feedback to the user here,
      // such as a toast notification or a state update
    } catch (error) {
      console.error("Failed to duplicate resume:", error);
      // Handle the error, perhaps show an error message to the user
    }
  };

  const handleDelete = async () => {
    try {
      // Implement the delete functionality here
      // You might want to add a confirmation dialog before deleting
      // await deleteResume(resumeId);
      // Add feedback to the user here
    } catch (error) {
      console.error("Failed to delete resume:", error);
      // Handle the error, perhaps show an error message to the user
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      <Button
        variant="outline"
        onClick={() => window.open(`/print?id=${resumeId}`, "_blank")}
      >
        <Edit className="mr-2 h-4 w-4" /> Edit
      </Button>
      <Button
        variant="outline"
        onClick={() => window.open(`/print?id=${resumeId}`, "_blank")}
      >
        <Download className="mr-2 h-4 w-4" /> Download
      </Button>
      <Button variant="outline" size="sm" onClick={handleDuplicate}>
        <Copy className="mr-2 h-4 w-4" /> Duplicate
      </Button>
      <Button variant="outline" size="sm" onClick={handleDelete}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
