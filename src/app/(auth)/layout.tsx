export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <div className="flex items-start justify-center md:items-center">
        {children}
      </div>

      <div className="hidden md:block md:space-y-4 max-h-screen overflow-hidden bg-primary-foreground"></div>
    </div>
  );
}
