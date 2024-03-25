import DataTable from "@/app/(dasboard)/_components/table/data-table";
import { Heading } from "@/components/ui/heading";

const PostsPage = () => {
  return (
    <div className="space-y-4">
      <Heading title={"Posts"} description={"Manage posts"} />
      {/* <DataTable /> */}
    </div>
  );
};

export default PostsPage;
