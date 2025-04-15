import { trpc } from "@/trpc/client";
import { toast } from "sonner";

interface UseSaveProps {
  productId: string;
  isSaved: boolean;
}

export const useSave = ({ productId, isSaved }: UseSaveProps) => {
  const utils = trpc.useUtils();

  const save = trpc.saveProduct.create.useMutation({
    onSuccess: () => {
      toast.success("Saved");
      //utils.saveProduct.getMany.invalidate();
      utils.users.getOne.invalidate({ productId });
      //utils.subscriptions.getMany.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);

      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("You need to be logged in to remove saved");
        return;
      }
    },
  });
  const remove = trpc.saveProduct.remove.useMutation({
    onSuccess: () => {
      toast.success("Removed from saved");
      utils.users.getOne.invalidate({ productId });
    },
    onError: (error) => {
      toast.error(error.message);

      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("You need to be logged in to unsaved");
        return;
      }
    },
  });

  const isPending = save.isPending || remove.isPending;

  const onClick = () => {
    if (isSaved) {
      remove.mutate({ productId });
    } else {
      save.mutate({ productId });
    }
  };

  return {
    isPending,
    onClick,
  };
};
