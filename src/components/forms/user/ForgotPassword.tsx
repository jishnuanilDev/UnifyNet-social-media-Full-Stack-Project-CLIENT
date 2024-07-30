"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ForgotOtp from "./ForgotOtp";
const ResetPasswordForm = dynamic(() => import('./ResetPassword'), {
  ssr: false, // Disable server-side rendering for this component
  loading: () => <p>Loading Reset Password Form...</p>, // Optional loading component
});

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    console.log("token verifying");
    if (token) {
      router.replace("/");
    }
  }, []);

  const [email, setEmail] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [resetStep, setResetStep] = useState(1);
  const [errors, setErrors] = useState<{
    email?: string;
    error?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email) newErrors.error = "Enter your email address";
    else if (!/^[^\s@]+@[^\s@]+\.com$/.test(email))
      newErrors.email = "Email is inavlid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = () => {
    if (validate()) {
      setErrors({});
    } else {
      setErrors({});
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!validate()) return;
      localStorage.setItem("userEmail", email);
      await axios
        .post("http://localhost:5000/forgot-password", {
          email,
        })
        .then((res) => {
          console.log("its back....", res.data);
          // localStorage.setItem('user',)
          setStep(2);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  if (step === 1) {
    return (
      <div>
        <main className="flex flex-col md:flex-row  min-h-screen container w-full">
          <section className=" w-full sm:w-full md:w-[1000px] mt-4 md:mt-[200px]  md:ml-[100px] p-6 rounded-md shadow-lg ">
            <div>
              <Toaster />

              <h1 className="font-bold text-purple-400 text-3xl mb-8">
                Enter your Email
              </h1>
              {errors.error && <p style={{ color: "red" }}>{errors.error}</p>}
              <form action="" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    onClick={handleChange}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 rounded-md p-2  bg-zinc-800  "
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="w-full">
                  <button className="w-full bg-purple-600 h-10 rounded-md font-bold p-2 hover:bg-purple-700 transition ease-linear ">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section className="w-full  mt-8  ml-4 p-6 relative bg-gradient-to-r">
            <img
              src="https://wallpapergod.com/images/hd/dark-abstract-1920X1080-wallpaper-o2ijsiig93s3xwvy.jpeg"
              alt="Banner Image"
              className="w-full  h-full object-cover rounded-md shadow-lg min-h-0"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className=" text-4xl font-bold text-purple-400 md:text-6xl">
                Reset,
              </span>
              <span className="text-white text-4xl font-bold px-4 py-2 rounded md:text-6xl">
                {" "}
                Password
              </span>
            </div>
          </section>
        </main>
      </div>
    );
  }
  if (step === 2) {
    return <ForgotOtp email={email} setResetStep={setResetStep} />;
  }

  if (resetStep === 3) {
    return <ResetPasswordForm />;
  }
};

export default ForgotPassword;
