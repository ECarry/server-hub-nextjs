import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  onClick: ButtonProps["onClick"];
  disabled: boolean;
  isSaved: boolean;
  className?: string;
  size?: ButtonProps["size"];
}

export const SaveButton = ({
  onClick,
  disabled,
  isSaved,
  className,
  size,
}: Props) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={isSaved ? "secondary" : "default"}
      className={cn("rounded-full border", className)}
      size={size}
    >
      {isSaved ? "Saved" : "Save"}
    </Button>
  );
};
