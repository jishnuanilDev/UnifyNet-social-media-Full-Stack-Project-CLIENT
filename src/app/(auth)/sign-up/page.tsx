/* eslint-disable react/react-in-jsx-scope */
import "../../../styles/globals.css";
import Head from "next/head";
import dynamic from 'next/dynamic';
const SignUpForm = dynamic(() => import('@/components/forms/user/SignUpForm'), {
  loading: () => <p>Loading...</p>, // Optional loading component
});

const SignUp: React.FC = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale-1.0" />
      </Head>

      <SignUpForm />
    </>
  );
};

export default SignUp;
