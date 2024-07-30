/* eslint-disable react/react-in-jsx-scope */
export const metadata = {
  title: 'sign-up ',
  description: 'create account for unifynet social media',
};
import '../../../styles/globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    
  );
}
