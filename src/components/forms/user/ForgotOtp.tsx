"use client";
import React, { useState } from "react";
import { useRef } from "react";
import Image from 'next/image';
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/configs/axiosInstance";
interface ForgotOtpProps {
  email: string;
  setResetStep: React.Dispatch<React.SetStateAction<number>>;
}
const ForgotOtp: React.FC<ForgotOtpProps> = ({ email, setResetStep }) => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      console.log("otp string", newOtp.join("").trim());

      setOtp(newOtp);
      console.log("this is entered otp:", otp);

      if (index < inputRefs.current.length - 1) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handlePress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    } else if (e.key === "ArrowRight" && index < inputRefs.current.length - 1) {
      const nexInput = inputRefs.current[index + 1];
      if (nexInput) {
        nexInput.focus();
      }
    } else if (
      e.key === "Backspace" &&
      index > 0 &&
      e.currentTarget.value === ""
    ) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const verifySubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      axiosInstance
        .post(`/fpassword-otp/${email}`, {
          otp,
        })
        .then((res) => {
          console.log("otp response", res.data);
          setResetStep(3);
          router.push("/sign-in/reset-password");
        })
        .catch((err) => {
          console.error(
            "Error occured during verifying otp for forgot password client",
            err
          );
          toast.error(err.response.data.message);
        });
    } catch (err) {
      console.error(
        "Error occured during verifying otp in client forgot otp",
        err
      );
    }
  };
  return (
    <div>
      <Toaster />
      <main className="flex flex-col md:flex-row  min-h-screen container ">
        <section className="w-[800px]  mt-8 p-6 relative bg-gradient-to-r">
          <img
            src="https://wallpapergod.com/images/hd/dark-abstract-1920X1080-wallpaper-o2ijsiig93s3xwvy.jpeg"
            alt="Banner Image"
            className="w-full h-full object-cover rounded-md shadow-lg min-h-0"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className=" text-4xl font-bold text-purple-400 md:text-6xl"></span>
            <span className="text-white text-4xl font-bold px-4 py-2 rounded md:text-3xl">
              OTP Verification
            </span>
          </div>
        </section>

        <section className=" w-full md:w-[550px] mt-4 md:mt-[200px]  md:ml-[50px] p-6 rounded-md shadow-lg ">
          <div>
            <div className="max-w-md mx-auto text-center bg-customBlack px-4 sm:px-8 py-10 rounded-xl shadow">
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">
                  Please verify your OTP
                </h1>
                <p className="text-[15px] text-purple-400/80">
                  Enter the 4-digit verification code that was sent to your
                  Email ID.
                </p>
              </header>
              <form id="otp-form" onSubmit={verifySubmit}>
                <div className="flex items-center justify-center gap-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <input
                      required
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      key={index}
                      type="text"
                      className=" w-14 h-14 text-center text-2xl font-extrabold text-white bg-lightBlack border border-transparent hover:border-slate-800 appearance-none rounded p-4 outline-none focus:bg-purple-900/40 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      pattern="\d*"
                      maxLength={1}
                      inputMode="numeric"
                      onKeyPress={handlePress}
                      onChange={(e) => handleChange(e, index)}
                      ref={(el: HTMLInputElement | null) => {
                        inputRefs.current[index] = el;
                      }}
                    />
                  ))}
                </div>
                <div className="max-w-[260px] mx-auto mt-4">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-purple-700 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-purple-500 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                  >
                    Verify Account
                  </button>
                </div>
              </form>
              <div className="text-sm text-slate-500 mt-4">
                Didnt receive code?{" "}
                <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="#0"
                >
                  Resend
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ForgotOtp;
