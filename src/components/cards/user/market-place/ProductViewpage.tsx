import React from "react";
import ProfileSidebar from "@/components/shared/user/ProfileSidebar";

function ProductViewpage() {
  return (
    <div className="h-screen">
      <ProfileSidebar />
      <section className="flex justify-center items-center ">
        <div className="bg-midBlack w-[900px] h-[700px] mt-8 rounded-lg">
          <div className="bg-lightBlack w-[500px] h-52 mt-4 mx-auto rounded-lg"></div>
          <div className="ml-52 mt-4">
            <h1>Lorem ipsum is a filler text commonly used in the publishing.</h1>
            <h2>30,000</h2>
            <span>Listed 23 hrs ago . <span>Kochi, KL</span></span>
          </div>

          <div className="flex gap-8 justify-center mt-6">
            <div className="bg-lightBlack w-9 h-9 rounded-full"></div>
            <div className="bg-lightBlack w-9 h-9 rounded-full"></div>
            <div className="bg-lightBlack w-9 h-9 rounded-full"></div>
          </div>

          <div className="ml-52 mt-4"><h1>Description</h1></div>
          <div className="ml-52 mt-4 w-[500px]">
            <h2>
            Lorem ipsum is a filler text commonly used in the publishing and graphic design industries to showcase the visual effects of a document or a typeface without the distraction of readable text. Its origins can be traced back to a scrambled version of a passage from 
            </h2>
          </div>

          <div className="ml-52 mt-4"><h1>Seller</h1></div>
          <div className="ml-52 mt-4"><span>username</span></div>
          <div className="ml-52 mt-4"><span>Kochi, KL,India</span></div>
        </div>
      </section>
    </div>
  );
}

export default ProductViewpage;
