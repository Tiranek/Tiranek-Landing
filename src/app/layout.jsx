import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google"
import "../styles/globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: ["400"],
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
      className={`${plusJakartaSans.variable} ${dmSerifDisplay.variable} antialiased`}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}
