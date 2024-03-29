interface ProudctEditPageProps {
  params: {
    slug: string;
  };
}
const ProudctEditPage = ({ params }: ProudctEditPageProps) => {
  return <div>{params.slug}</div>;
};

export default ProudctEditPage;
