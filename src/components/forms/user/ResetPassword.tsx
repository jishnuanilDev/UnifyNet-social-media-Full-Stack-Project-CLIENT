"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useEffect } from "react";

import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ResetPasswordForm: React.FC = () => {

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    console.log("token verifying");
    if (token) {
      router.replace("/");
    }
  }, []);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    all?: string;
    passwordMatch?: string;
  }>({});

  const router = useRouter();
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!newPassword && !confirmNewPassword)
      newErrors.all = "Please fill out the fields";
    else if (newPassword !== confirmNewPassword)
      newErrors.passwordMatch = "Password do not match";
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
      const userEmail = localStorage.getItem("userEmail");
      await axios
        .post("http://localhost:5000/reset-password", {
          userEmail,
          newPassword,
        })
        .then((res) => {
          console.log("res data in signup client", res.data);
          localStorage.setItem("userToken", res.data.userToken);
          toast.success(res.data.message);
          router.push("/");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      console.error("Error occured during client signup", err);
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
            <span className=" text-4xl font-bold text-purple-400 md:text-6xl">
              Please,
            </span>
            <span className="text-white text-4xl font-bold px-4 py-2 rounded md:text-3xl">
              Reset your Password
            </span>
          </div>
        </section>

        <section className=" w-full md:w-[550px] mt-4 md:mt-[200px]  md:ml-[50px] p-6 rounded-md shadow-lg ">
          <div>
            <h1 className="font-bold text-purple-400 text-3xl mb-8">
              Create a new password
            </h1>
            {errors.all && <p style={{ color: "red" }}>{errors.all}</p>}
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <input
                  onClick={handleChange}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  className="w-full h-12 rounded-md p-2  border-0  bg-zinc-800"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4">
                <input
                  onClick={handleChange}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  type="password"
                  className="w-full h-12 rounded-md p-2 border-0  bg-zinc-800"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
                {errors.passwordMatch && (
                  <p style={{ color: "red" }}>{errors.passwordMatch}</p>
                )}
              </div>
              <div className="w-full">
                <button className="w-full bg-purple-600 h-10 rounded-md font-bold p-2 hover:bg-purple-700 transition ease-linear">
                  Submit
                </button>
              </div>
              <div className="flex justify-between mt-4">
                <label
                  htmlFor="create-account"
                  className=" cursor-pointer font-mono"
                >
                  Create a new account{" "}
                  <Link className="text-purple-400" href="/sign-up">
                    Sign up
                  </Link>
                </label>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResetPasswordForm;
