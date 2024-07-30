/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import dynamic from "next/dynamic";
const LoginForm = dynamic(()=>import('@/components/forms/user/LoginForm'),{
  ssr:false
})
const Home: React.FC = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale-1.0" />
      </Head>

      <LoginForm />
    </>
  );
};

export default Home;
