"use client";
import React, { useState } from "react";
import Link from "next/link";

import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AdminLoginForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    email?: string;
    error?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email || !password) newErrors.error = "Please fill out the fields";
    else if (!/^[^\s@]+@[^\s@]+\.com$/.test(email))
      newErrors.email = "Email is inavlid";
    if (!password) newErrors.password = "Password is required";
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
  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!validate()) return;

      router.push("/admin-panel");
      //   const res = await axios.post('http://localhost:5000/admin-login',{
      //     email,password
      //   }).then((res)=>{
      //     console.log('its back....', res.data);
      //     localStorage.setItem("adminToken",res.data.adminToken);
      //     router.push('/admin-panel')
      //   }).catch((err)=>{
      //     console.log(err.response.data.message)
      //     toast.error(err.response.data.message)
      //   })
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <div>
      <main className="flex flex-col md:flex-row  min-h-screen container w-full">
        <section className=" w-full sm:w-full md:w-[1000px] mt-4 md:mt-[200px]  md:ml-[100px] p-6 rounded-md shadow-lg ">
          <div>
            <Toaster />

            <h1 className="font-bold text-purple-400 text-3xl mb-8">
              Admin Login
            </h1>
            {errors.error && <p style={{ color: "red" }}>{errors.error}</p>}
            <form action="" onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  onClick={handleChange}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-md p-2 border-0 bg-zinc-800  "
                  type="email"
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4 ">
                <input
                  onClick={handleChange}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full h-12 rounded-md p-2  border-0 bg-zinc-800  "
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="w-full">
                <button className="w-full bg-purple-600 h-10 rounded-md font-bold p-2 hover:bg-purple-700 transition ease-linear ">
                  Login
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
              Hello,
            </span>
            <span className="text-white text-4xl font-bold px-4 py-2 rounded md:text-6xl">
              Welcome
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminLoginForm;
