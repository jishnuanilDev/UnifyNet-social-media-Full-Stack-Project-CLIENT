
import "@/styles/globals.css";
const ProfileCardSkeleton: React.FC = () => {
  return (
    <>
      <div className=" ml-10 animate-pulse bg-gradient-to-b from-fuchsia-800/20 to-fuchsia-950/0 md:h-80 h-44  flex md:mr-10 mr-3 md:mt-7 mt-4 rounded-xl  ">
        <div className="h-full">
          <div className="flex justify-center md:mt-14 mt-6 md:ml-14 ml-2">
            <div className="relative w-28 h-28">
              <div className="md:w-28 md:h-28 w-16 h-16  bg-white/35 rounded-full overflow-hidden">
              
              </div>
            </div>
          </div>
        </div>
        <div className="md:ml-20 md:mt-14 mt-2 font-sm ml-[-40px]">
          <div className="flex md:gap-7 md:flex-row flex-col">
            <span className=" bg-white/35 h-6 w-36 rounded-full">
            </span>

            <div className="flex gap-2 mt-3 md:mt-0 ">
              <span className=" md:text-sm text-[12px] h-5 md:ml-10 ">
                <button className="bg-white/35 text-white/0  md:px-4 px-2 md:py-1 rounded-full">
                  Edit Profile
                </button>
              </span>
              <span className="md:text-sm text-[12px] h-5">
                <button className="bg-white/35 text-white/0 md:px-4 px-2 md:py-1 rounded-full">
                  Change Password
                </button>
              </span>
            </div>

            <span className="md:text-sm text-[12px] h-5 md:mt-0 mt-4">
              <button className="bg-white/35 text-white/0 rounded-full ">
                <div className="flex gap-2 mt-2">
                  <span> Activate premium activation</span>
                </div>
              </button>
            </span>
          </div>

          <div className="flex md:gap-7 gap-2 md:mt-10 mt-5 md:ml-0 ml-[-30px]">
            <span className=" bg-white/35 h-3 w-20 rounded-full flex"></span>
            <span className=" bg-white/35 h-3 w-20 rounded-full flex"></span>
            <span className=" bg-white/35 h-3 w-20 rounded-full flex"></span>
          </div>
          <div className="flex justify-center"></div>
          <div className="flex gap-7 md:mt-5 mt-2 md:ml-0 ml-[-20px]">
            <span className=" bg-white/35 h-2 w-24 rounded-full flex">
        
            </span>
          </div>
          <div className="flex gap-7 md:mt-5 mt-2 ml-[-70px]">
            <span className="bg-white/35 h-2 w-24 rounded-full flex">
            
            </span>
          </div>
        </div>
      </div>

      <hr className=" animate-pulse w-48 h-1 mx-auto my-4 mt-10 md:mt-0 bg-white/35 border-0 rounded md:my-10 dark:bg-lightBlack" />
    </>
  );
};

export default ProfileCardSkeleton;
