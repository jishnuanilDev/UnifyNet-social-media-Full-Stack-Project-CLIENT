/* eslint-disable react/react-in-jsx-scope */
import '@/styles/globals.css'
import Head from 'next/head';
import dynamic from "next/dynamic";
const AdminLoginForm = dynamic(() => import('@/components/forms/admin/AdminLoginForm'), {
  loading: () => <p>Loading...</p>, 
});
const Home: React.FC = () => {
  return (
<>
    <Head>
    <meta name='viewport' content='width=device-width, initial-scale-1.0' />
    </Head>

<AdminLoginForm/>
</>

  )
};

export default Home;        







