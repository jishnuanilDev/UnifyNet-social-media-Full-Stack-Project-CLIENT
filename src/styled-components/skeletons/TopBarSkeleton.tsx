
import "@/styles/globals.css";
const TopBarSkeleton: React.FC = () => {
  return (
    <>
      <div className="bg-customBlack h-16  flex justify-end items-center gap-8">
        <div className=" flex">
          <div className="w-[450px] ">
            <div className=" animate-pulse bg-white/20 h-7 w-96 rounded-full"></div>
          </div>

        </div>

        <div className="text-sm flex animate-pulse ">
          <span className="mr-2 bg-white/20 h-7 w-7 rounded-full"></span>
          <span className="mt-1 bg-white/20 h-3 w-28 rounded-full"></span>
        </div>
        <div className="animate-pulse md:mr-20 text-sm flex">
        <span className="mr-2 bg-white/20 h-7 w-7 rounded-full"></span>
        <span className="mt-1 bg-white/20 h-3 w-28 rounded-full"></span>
        </div>

        <div className="animate-pulse bg-profileBlack h-16 items-center justify-center md:w-[300px]  cursor-pointer ">
          <div className="flex flex-col items-center mt-3 ">
            <div className="flex md:ml-0 ">
              <span className=" ml-2 md:ml-0 mr-2 md:mt-1 mt-2 bg-white/20 h-7 w-7 rounded-full"></span>
              <span className="hidden md:block bg-white/20 h-3 w-28 rounded-full ">
                
              </span>
            </div>
            <div className="hidden md:block ml-8 bg-white/20 h-2 w-24 rounded-full">
    
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBarSkeleton;
