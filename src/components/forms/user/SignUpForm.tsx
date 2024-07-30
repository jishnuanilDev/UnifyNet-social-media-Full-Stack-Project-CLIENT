"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Toaster, toast } from "react-hot-toast";

import OtpForm from "./OtpForm";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    all?: string;
    fullname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    strongPassword?: string;
  }>({});
  const [step, setStep] = useState<number>(1);
  // useEffect(() => {
  //   console.log("token verifying");
  //   if (token) {
  //     router.replace("/");
  //   }
  // }, []);
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!fullname && !email && !password && !confirmPassword)
      newErrors.all = "Please fill out the fields";
    else if (!fullname) newErrors.fullname = "Fullname is required";
    else if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.com$/.test(email))
      newErrors.email = "Email is inavlid";
    else if (!password) newErrors.password = "Password is required";
    else if (!confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    )
      newErrors.strongPassword =
        "Password minimum 8 characters Need ,Password should contain an upper case , lower case , digit and an special character";

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
  const handleSignUp = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!validate()) return;
      await axios
        .post("http://localhost:5000/sign-up", {
          fullname,
          email,
          password,
        })
        .then((res) => {
          console.log("res data in signup client", res.data);

          const user = { fullname, email };
          localStorage.setItem("user", JSON.stringify(user));

          setStep(2);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      console.error("Error occured during client signup", err);
    }
  };

  if (step === 1) {
    return (
      <div>
        <Toaster />
        <main className="flex flex-col md:flex-row  min-h-screen container ">
          <section className="md:w-[800px]  md:mt-8 p-6 relative bg-gradient-to-r">
            <img
              src="https://wallpapergod.com/images/hd/dark-abstract-1920X1080-wallpaper-o2ijsiig93s3xwvy.jpeg"
              alt="Banner Image"
              className="w-full h-full object-cover rounded-md shadow-lg min-h-0"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className=" text-4xl font-bold text-purple-400 md:text-6xl">
                Hello,
              </span>
              <span className="text-white text-2xl font-bold md:px-4 md:py-2 rounded md:text-3xl">
                Create your account
              </span>
            </div>
          </section>

          <section className=" w-full md:w-[550px]  md:mt-[200px]  md:ml-[50px] p-6 rounded-md shadow-lg ">
            <div>
              <h1 className="font-bold text-purple-400 text-3xl mb-8">
                Sign Up
              </h1>
              {errors.all && <p style={{ color: "red" }}>{errors.all}</p>}
              <form onSubmit={handleSignUp}>
                <div className="mb-4">
                  <input
                    onClick={handleChange}
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full h-12 rounded-md p-2  bg-zinc-800"
                    type="text"
                    id="fullName"
                    placeholder="Fullname"
                  />
                  {errors.fullname && (
                    <p style={{ color: "red" }}>{errors.fullname}</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    onClick={handleChange}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 rounded-md p-2  bg-zinc-800 none"
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    onClick={handleChange}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full h-12 rounded-md p-2   bg-zinc-800"
                    id="password"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p style={{ color: "red" }}>{errors.password}</p>
                  )}
                  {errors.strongPassword && (
                    <p style={{ color: "red" }}>{errors.strongPassword}</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    onClick={handleChange}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className="w-full h-12 rounded-md p-2   bg-zinc-800"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && (
                    <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                  )}
                </div>
                <div className="w-full">
                  <button className="w-full bg-purple-600 h-10 rounded-md font-bold p-2 hover:bg-purple-700 transition ease-linear">
                    Signup
                  </button>
                </div>
                <div className="flex justify-between mt-4">
                  <label
                    htmlFor="create-account"
                    className=" cursor-pointer font-mono"
                  >
                    Already have an account?{" "}
                    <Link className="text-purple-400" href="/">
                      Login
                    </Link>
                  </label>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    );
  }
  if (step === 2) {
    return <OtpForm fullname={fullname} email={email} />;
  }
};

export default SignUpForm;
