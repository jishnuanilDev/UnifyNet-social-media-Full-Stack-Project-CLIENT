import '@/styles/globals.css'

export const metadata = {
  title: 'sign-in ',
  description: ' login for unifynet social media',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
