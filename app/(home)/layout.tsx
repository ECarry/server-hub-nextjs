import Header from './_components/header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      {children}
      <footer>Footer</footer>
    </div>
  )
}
