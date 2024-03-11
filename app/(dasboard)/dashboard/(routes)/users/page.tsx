import { getAllUsers } from "@/data/user";

import { columns } from "./columns";
import DataTable from "@/app/(dasboard)/_components/table/data-table";

const PostsPage = async () => {
  const users = await getAllUsers();

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-heading-medium md:text-heading-large">Users</h1>
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
