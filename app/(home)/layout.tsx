import { Separator } from '@radix-ui/react-separator'
import Footer from './_components/footer'
import Header from './_components/header'
import { NavigationBar } from './_components/navigation-bar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <NavigationBar />
      {children}
      <Footer />
    </div>
  )
}
