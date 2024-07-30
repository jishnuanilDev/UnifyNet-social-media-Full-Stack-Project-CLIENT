import React, { useState } from "react";
import Link from "next/link";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { headers } from "next/headers";
import axios from "axios";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

interface IreportModalProps{
  reportModal:boolean;
  setReportModal:React.Dispatch<React.SetStateAction<boolean>>
  postId:string
}
const ReportModal: React.FC<IreportModalProps> = ({reportModal,setReportModal,postId}) => {
  const [report,setReport] = useState('');
  const handleReport = async ()=>{
    try{
const userToken = localStorage.getItem('userToken');
if(!userToken){
  toast.error("Sign in Required");
  return;
}

const response = await axios.post('http://localhost:5000/report-post',{
  report,postId
}, {
  headers: {
    Authorization: userToken,
  },
})
if(response){
  console.log('response in client report posted',response);
  toast.success(response.data.message);
  setTimeout(() => {
    setReportModal(false)
  }, 800);
 
}

    }catch(err:any){
      console.error('Error occured in during report post report client',err)
        toast.error(err.response.data.message);
    }
  }
  if(reportModal){
    return (
      <div className="w-[500px] relative ">
        <Toaster />
        <div className="fixed top-0 left-0 w-full h-full bg-black/25 bg-opacity-50  z-40"></div>
  
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="  flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <section className="flex justify-center">
            <div className="bg-sidebarBlack w-[400px] h-[300px] flex flex-col items-center  rounded-2xl ">
              <div className=" mt-4 ">
                <div className="flex justify-center items-center w-[500px] bg-gradient-to-r from-purple-900/10 to-fuchsia-600/10 h-8 rounded-3xl">
                  <span className="font-extrabold italic">Report Post</span>
                </div>
                <div className="flex mt-6 justify-center mb-8">
                  <input
                  onChange={(e)=>setReport(e.target.value)}
                  value={report}
                    placeholder="Enter your report..."
                    className="bg-black w-[400px] h-8 rounded-full p-3 text-[12px] "
                    type="text"
                  />
                </div>
                <div className="mt-4 flex justify-center gap-10 mb-8">
                  <button className="bg-gradient-to-r from-red-600/25 to-red-600 px-4 rounded-full" onClick={()=>setReportModal(false)}>
                    Cancel
                  </button>
                  <button className="bg-gradient-to-r from-green-700 to-purple-900 px-4 rounded-full" onClick={handleReport}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
  
};

export default ReportModal;
