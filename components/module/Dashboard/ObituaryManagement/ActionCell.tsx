/* eslint-disable @typescript-eslint/no-explicit-any */

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

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
import { Spinner } from "@/components/ui/spinner";
import { useDeleteDeathNoticeMutation, useDeleteFuneralNoticeMutation } from "@/redux/api/dashboardApi";

const ActionCell = ({ id, type }: any) => {
  const [deleteDeathNotice, { isLoading: isDeletingDeath }] = useDeleteDeathNoticeMutation();
  const [deleteFuneralNotice, { isLoading: isDeletingFuneral }] = useDeleteFuneralNoticeMutation();

  const isLoading = isDeletingDeath || isDeletingFuneral;

  const handleDelete = async () => {
    try {
      if (type === "FUNERAL_NOTICE") {
        await deleteFuneralNotice(id).unwrap();
        toast.success("Funeral notice deleted successfully");
      } else {
        await deleteDeathNotice(id).unwrap();
        toast.success("Death notice deleted successfully");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete notice.");
      console.error("Failed to delete notice:", err);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          disabled={isLoading}
          className="text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? <Spinner /> : <Trash2 className="w-5 h-5" />}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete the obituary . You can’t undo this change.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionCell;
