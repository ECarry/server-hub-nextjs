import { getAllUsers } from "@/data/user";

import { columns } from "./columns";
import DataTable from "@/app/(dasboard)/_components/table/data-table";
import { Heading } from "@/components/ui/heading";

const PostsPage = async () => {
  const users = await getAllUsers();

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <Heading title={"Users"} description={"Manage users"} />
      <DataTable
        data={users}
        columns={columns}
        searchPlaceholder="name"
        showCreateButton={false}
      />
    </div>
  );
};

export default PostsPage;
