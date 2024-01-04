export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container grid grid-cols-1 p-4 md:grid-cols-2 min-h-[700px]">
      <div></div>
      <div className="flex items-center justify-center py-20">
        {children}
      </div>
      
    </div>
  )
}
