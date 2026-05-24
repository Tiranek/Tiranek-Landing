import { Bebas_Neue, DM_Sans } from "next/font/google"
import "../styles/globals.css"
import PageTransition from "@/components/PageTransition"

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  weight: ["400"],
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata = {
  title: "Tiranek - Book Your Perfect Sports Field",
  description:
    "The easiest way to reserve sports fields. Find, book, and manage your game time with just a few taps.",
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans">
        <PageTransition />
        {children}
      </body>
    </html>
  )
}
