export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-start justify-center md:items-center">
        {children}
      </div>
      <div className="bg-black hidden md:block">

      </div>
    </div>
  )
}
