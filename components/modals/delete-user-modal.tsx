"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useState, useTransition } from "react";
import { deleteUser } from "@/actions/user";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormError from "../auth/form-error";
import { Loader2 } from "lucide-react";
import { toast } from "../ui/use-toast";

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
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-8">
          <DialogTitle className=" text-center text-xl truncate font-semibold">
            Are you sure?
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <FormError message={error} />
        <DialogFooter className="mt-4 grid grid-cols-2 gap-x-3">
          <Button
            variant={"outline"}
            onClick={() => onClose()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>Delete User</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
