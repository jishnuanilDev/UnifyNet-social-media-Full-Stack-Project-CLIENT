import React, { useState } from "react";
import PricingModal from "@/components/cards/user/payment/Pricingcard";
interface KYCFormData {
    fullname: string | undefined;
    email: string | undefined;
    phone: number | undefined;
    dateOfBirth: string;
    address: string;
  }
interface IKycProps {
    cardOpen: boolean;
    setKycOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fullname?:string;
    phone?: number;
    email?: string;
  }
const KycForm: React.FC<IKycProps> = ({
    fullname,
    phone,
    email,
    cardOpen,
    setKycOpen,
}) => {
    const [priceModal,setPriceModal] = useState(false);
    const [formData, setFormData] = useState<KYCFormData>({
        fullname:fullname ,
        email: email,
        phone: phone,
        dateOfBirth: "",
        address: "",
      });

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;
setFormData({
    ...formData,[name]:value
})
      }

      const handleSubmit = (e: React.FormEvent)=>{
e.preventDefault();
setPriceModal(true);

      }
  return (
    <>
      <div className="">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-sidebarBlack rounded-xl shadow-lg w-1/2 p-6">
            <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-white text-center">
              Please Complete your Kyc
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="Full_name"
                    className="block mb-2 text-sm font-medium text-white "
                  >
                    Full name
                  </label>
                  <input
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                    type="text"
                    id="full_name"
                    className="placeholder:text-white/30 bg-white/5 border-0 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="eg: John doe"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="date_of_birth"
                    className="block mb-2 text-sm font-medium text-white "
                  >
                    Date of birth
                  </label>
                  <input
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                    type="string"
                    id="last_name"
                    className="placeholder:text-white/30 bg-white/5  border-0 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="eg: DD-MM-YYYY"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Email address
                  </label>
                  <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                    type="email"
                    id="email"
                    className="placeholder:text-white/30 bg-white/5 border-0 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="eg: john.doe@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Phone number
                  </label>
                  <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                    type="number"
                    id="phone"
                    className="placeholder:text-white/30 bg-white/5  border-0 text-whitetext-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="eg: 1234567890"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Address
                </label>
                <input
                name="address"
                  type="address"
                  id="address"
                  className="placeholder:text-white/30 bg-white/5  border-0 text-white  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="password"
                  required
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-fuchsia-900 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </form>
            {
                priceModal &&<PricingModal
                fullname={formData.fullname}
                phone={formData.phone}
                email={formData.email}
                dateOfBirth = {formData.dateOfBirth}
                address = {formData.address}
                setPriceModal={setPriceModal}
                />
            }

            <div className="flex justify-center mt-3" onClick={()=>setKycOpen(false)}>
              <button className="bg-sidebarBlack  hover:bg-gray-300 text-white/30 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycForm;
