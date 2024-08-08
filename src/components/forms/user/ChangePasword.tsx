"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Toaster, toast } from "react-hot-toast";

const ChangePassword: React.FC = () => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [errors, setErrors] = useState<{
    passwordMatch?: string;
    error?: string;
    samePass?: string;
  }>({});
  const [check, setCheck] = useState("");
  const router = useRouter();

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!currentPass || !newPass || !confirmNewPass)
      newErrors.error = "Please fill out the fields";
    else if (newPass !== confirmNewPass)
      newErrors.passwordMatch = "Passwords do not match";
    else if (currentPass === newPass)
      newErrors.samePass = "Your old and new password is same";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = () => {
    setErrors({});
    setCheck("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!validate()) return;
      const userToken = localStorage.getItem("userToken");
      await axios
        .post(
          "http://localhost:5000/change-password",
          {
            currentPass,
            newPass,
            confirmNewPass,
          },
          {
            headers: {
              Authorization: userToken,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success("Password updated successfully");
          router.push("/profile");
        })
        .catch((err) => {
          console.log(err);
          setCheck(err.response.data.message);
        });
    } catch (err) {
      console.error("Error occured during in changePassword Post client", err);
    }
  };

  return (
    <div>
      <section className=" flex items-center justify-center ">
        <div className="bg-customBlack w-[700px] h-[400px] flex justify-center rounded-md mt-10">
          <div>
            <div className="text-fuchsia-600 font-extrabold mt-8 italic mb-6 flex justify-center">
              <h2>Change Your Password</h2>
            </div>
            <Toaster />

            <form action="" onSubmit={handleSubmit}>
              <div className=" flex justify-center ">
                <input
                  onClick={handleChange}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  type="text"
                  className="w-[500px] h-8 rounded-full border-0 p-3 bg-midBlack text-[13px] placeholder:text-white/30"
                  id="username"
                  placeholder="Enter current password"
                />
              </div>
              {check && (
                <p
                  style={{ color: "red" }}
                  className="text-center text-sm mt-2"
                >
                  {check}
                </p>
              )}
              {errors.samePass && (
                <p
                  style={{ color: "red" }}
                  className="text-center text-sm mt-2"
                >
                  {errors.samePass}
                </p>
              )}
              <div className="mb-4 text-end mr-2">
                <Link
                  href="/home/profile/change-password/forgot-password"
                  className="text-[11px] font-light font-sans text-fuchsia-500 "
                >
                  Forgot password
                </Link>
              </div>
              <div className="mb-8 flex justify-center">
                <input
                  onClick={handleChange}
                  onChange={(e) => setNewPass(e.target.value)}
                  type="text"
                  className="w-[500px] h-8 rounded-full p-3 border-0 bg-midBlack text-[13px] placeholder:text-white/30 inputError"
                  id="username"
                  placeholder="Enter new password"
                />
              </div>
              <div className=" flex justify-center">
                <input
                  onClick={handleChange}
                  onChange={(e) => setConfirmNewPass(e.target.value)}
                  type="text"
                  className="w-[500px] h-8 rounded-full p-3 border-0 bg-midBlack text-[13px] placeholder:text-white/30"
                  id="username"
                  placeholder="Confirm new password"
                />
              </div>
              {errors.error && (
                <p
                  style={{ color: "red" }}
                  className="text-center text-sm mt-2"
                >
                  {errors.error}
                </p>
              )}
              {errors.passwordMatch && (
                <p
                  style={{ color: "red" }}
                  className="text-center text-sm mt-2"
                >
                  {errors.passwordMatch}
                </p>
              )}

              <div className="flex justify-center mt-12">
                <button className="bg-gradient-to-tr from-purple-600 to-purple-950 px-4 py-1 w-20 rounded-3xl  hover:scale-110 transition ease-in  duration-200 ">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
