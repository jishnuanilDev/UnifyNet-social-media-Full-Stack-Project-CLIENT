/* eslint-disable react/react-in-jsx-scope */
"use client"
import '@/styles/globals.css'
import dynamic from "next/dynamic";
import { useEffect } from 'react';
const AdminLoginForm = dynamic(() => import('@/components/forms/admin/AdminLoginForm'), {
  loading: () => <p>Loading...</p>, 
});
const Home: React.FC = () => {
  useEffect(() => {
    // This code will only run on the client side
    document.title = "AdminLogin"
  }, []);
  return (
<>

<AdminLoginForm/>
</>

  )
};

export default Home;        







