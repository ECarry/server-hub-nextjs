"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import FormError from "../auth/form-error";
import { deleteCollection } from "@/actions/collection";
import { Loader2 } from "lucide-react";

const DeleteCollectionModal = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  const { collection } = data;

  const isModalOpen = isOpen && type === "deleteCollection";

  if (!collection || !collection.id) {
    return null;
  }

  const onSubmit = () => {
    setError("");
    setSuccess("");

    startTransition(() => {
      deleteCollection(collection.id).then((data) => {
        router.push("/collections");
        router.refresh();
        onClose();
      });
    });
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting your collection is permanent and irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormError message={error} />
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={onSubmit}
            disabled={isPending}
            className="w-[160px]"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>Delete collection</span>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCollectionModal;
