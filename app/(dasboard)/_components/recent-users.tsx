import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";

interface RecentUsersProps {
  users: User[] | null;
}

const Row = (user: User) => {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={user.image || ""} alt="Avatar" />
        <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
      <div className="ml-auto font-medium">{user.role}</div>
    </div>
  );
};

export function RecentUsers({ users }: RecentUsersProps) {
  return (
    <div className="space-y-8">
      {users?.map((user) => (
        <Row key={user.id} {...user} />
      ))}
    </div>
  );
}
