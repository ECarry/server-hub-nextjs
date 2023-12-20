import Footer from './_components/footer'
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
      <Footer />
    </div>
  )
}
