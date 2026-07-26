import './globals.css'

export const metadata = {
  title: 'Degree Planner',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
