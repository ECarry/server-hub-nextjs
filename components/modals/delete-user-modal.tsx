"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useState, useTransition } from "react";
import { deleteUser } from "@/actions/user";
import { toast } from "../ui/use-toast";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import FormError from "../auth/form-error";
import { Loader2 } from "lucide-react";

const DeleteUserModal = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const { isOpen, onClose, type, data } = useModal();

  const { user } = data;

  const isModalOpen = isOpen && type === "deleteUser";

  if (!user || !user.id) {
    return null;
  }

  const onSubmit = () => {
    setError("");

    startTransition(() => {
      deleteUser(user).then((data) => {
        if (data.success) {
          toast({
            title: "User deleted",
            description: `User ${user.name} has been deleted`,
          });
          onClose();
        } else if (data.error) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            <span className="text-red-500">{" " + user.name + " "}</span>
            account and remove
            <span className="text-red-500">{" " + user.name + " "}</span>
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormError message={error} />
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button onClick={onSubmit} disabled={isPending} className="w-[120px]">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>Delete User</span>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserModal;
