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
  DialogTrigger,
} from "@/components/ui/dialog";
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
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-8">
          <DialogTitle className=" text-center text-xl truncate font-semibold">
            Are you sure?
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            Deleting your collection is permanent and irreversible.
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
              <span>Delete collection</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCollectionModal;
