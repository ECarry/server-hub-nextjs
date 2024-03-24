const ProdutcsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-heading-medium md:text-heading-large">Products</h1>
      {children}
    </div>
  );
};

export default ProdutcsLayout;
