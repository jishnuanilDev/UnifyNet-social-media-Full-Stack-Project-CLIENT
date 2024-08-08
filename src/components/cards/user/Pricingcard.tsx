"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
interface IPriceModalProps {
  cardOpen: boolean;
  setCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username?:string;
  phone?: number;
  email?: string;
}
const PricingModal: React.FC<IPriceModalProps> = ({
  username,
  phone,
  email,
  cardOpen,
  setCardOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setRazorpayLoaded(true);
      console.log("Razorpay script loaded successfully.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const handleRazorpaySuccess = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      console.log("payment success handleRazorpay success");
      const result = await axios.post(
        "http://localhost:5000/blueTickConfirmed",
        {},
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result) {
        toast.success(result.data.message);
      } else {
        toast.error("Something Wrong");
      }

      router.push("/profile");
    } catch (err) {
      toast.error("Something Wrong");
      console.error(
        "Error occured in post blue tick premium true in client",
        err
      );
    }
  };
  const handlePayment = () => {
    try {
      console.log("handle payemnt triggered");
      const options = {
        key: "rzp_test_lyhW5HCWaB5v8H",
        amount: 499 * 100,
        currency: "INR",
        name: "Unifynet",
        description: "Payment For Blue-Tick Verification",
        handler: function (response: any) {
          console.log("Payment response:", response);

          if (response.razorpay_payment_id) {
            console.log("Payment successful:", response);

            handleRazorpaySuccess();
          } else {
            console.log("Payment failed:", response);
          }
        },

        prefill: {
          name: username,
          email: email,
          contact: phone
        },
        theme: {
          color: "#aa33c4",
        },
      };
      if (razorpayLoaded) {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        console.error("Razorpay SDK not loaded yet.");
      }
    } catch (err) {
      console.error("Razorpay SDK not loaded yet.", err);
    }
  };
  return (
    <div className="">
      <Toaster />
      {cardOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-sidebarBlack rounded-lg shadow-lg w-1/2 p-6">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white text-center">
              Activate Your Premium Account Now!
            </h2>
            <p className="mb-5 font-light text-white sm:text-xl text-center">
              Enhance your online presence and establish trust with your
              audience. Increase your visibility on the platform, making it
              easier for followers to find and connect with you. Enjoy a suite
              of benefits exclusive to verified accounts.
            </p>
            <div className="mx-auto  ">
              {/* Pricing Card */}
              <div className=" flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-sidebarBlack border rounded-lg border-gray-300 shadow dark:border-black-600 xl:p-8 dark:bg-gray-800 ">
                <h3 className="mb-4 text-2xl font-semibold flex justify-center ">
                  <div className="gap-3 flex items-center space-x-2l">
                    <MdVerified style={{ color: "blue" }} />
                    Get Your Blue Tick
                  </div>
                </h3>
                <p className="font-light  sm:text-lg dark:text-gray-400 text-white">
                  Enhance your profile with a premium Blue Tick badge
                </p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">₹ 499</span>
                </div>
                {/* List */}
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span> One-time payment</span>
                  </li>
                  {/* ... */}
                </ul>
                <a
                  onClick={handlePayment}
                  href="#"
                  className="text-white bg-fuchsia-800 hover:bg-fuchsia-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                >
                  Pay now
                </a>
              </div>
              {/* ... */}
            </div>
            <div className="flex justify-center mt-3">
              <button
                onClick={() => setCardOpen(false)}
                className="bg-sidebarBlack  hover:bg-gray-300 text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingModal;
