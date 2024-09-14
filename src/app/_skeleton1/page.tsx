
import "@/styles/globals.css";
const LeftSidebarSkeleton: React.FC = () => {
  return (
    <div className="bg-sidebarBlack h-screen md:w-[250px] w-[50px] float-left ">
      <div className="">
        <div>
          <div className="mt-5 ml-2 md:ml-10 flex text-xl cursor-pointer gap-3  animate-pulse">
            <span className="text-sm bg-white/45 rounded-full w-7 h-7 "></span>
            <span className="rounded-full  md:bg-white/45 w-36 h-5 mt-1"></span>
          </div>
        </div>

        <div className="ml-3.5 sm:ml-8 md:ml-14 ">
          <div className="mt-9  flex cursor-pointer animate-pulse">
            <span className="text-sm bg-white/45 rounded-full w-5 h-5"></span>
            <span className=" ml-3 mt-1 text-sm md:bg-white/45 w-28 h-3 rounded-full" ></span>
          </div>

          <div className="mt-9  flex cursor-pointer animate-pulse ">
            <span className="text-sm bg-white/45 rounded-full w-5 h-5"></span>
            <span className=" ml-3 mt-1 text-sm md:bg-white/45 w-28 h-3 rounded-full" ></span>
          </div>

          <div className="mt-9  flex cursor-pointer animate-pulse ">
            <span className="text-sm bg-white/45 rounded-full w-5 h-5"></span>
            <span className=" ml-3 mt-1 text-sm md:bg-white/45 w-28 h-3 rounded-full" ></span>
          </div>
          <div className="mt-9  flex cursor-pointer  animate-pulse">
            <span className="text-sm bg-white/45 rounded-full w-5 h-5"></span>
            <span className=" ml-3 mt-1 text-sm md:bg-white/45 w-28 h-3 rounded-full" ></span>
          </div>

          <div className="mt-9  flex cursor-pointer animate-pulse">
            <span className="text-sm bg-white/45 rounded-full w-5 h-5"></span>
            <span className=" ml-3 mt-1 text-sm md:bg-white/45 w-28 h-3 rounded-full" ></span>
          </div>

          <div className="mt-9  flex cursor-pointer animate-pulse">
            <span className="text-sm bg-white/45 rounded-full w-5 h-5"></span>
            <span className=" ml-3 mt-1 text-sm md:bg-white/45 w-28 h-3 rounded-full" ></span>
          </div>

          <div className="mt-9  flex cursor-pointer animate-pulse">
            <span className="text-sm bg-white/45 rounded-full w-5 h-5"></span>
            <span className=" ml-3 mt-1 text-sm md:bg-white/45 w-28 h-3 rounded-full" ></span>
          </div>

          <div className="mt-9  flex cursor-pointer animate-pulse ">
            <span className="text-sm bg-white/45 rounded-full w-5 h-5"></span>
            <span className=" ml-3 mt-1 text-sm md:bg-white/45 w-28 h-3 rounded-full" ></span>
          </div>

          <div className="mt-14 md:mb-8 flex cursor-pointer animate-pulse">
          <span className="text-sm bg-white/45 rounded-full w-5 h-5"></span>
          <span className=" ml-3 mt-1 text-sm md:bg-white/45 w-28 h-3 rounded-full" ></span>
            <span className="mr-10  md:block"></span>
          </div>

          <div className="mt-5  h-8  flex bg-white/20 animate-pulse  w-[150px] p-1 rounded-md cursor-pointer hover:bg-fuchsia-400 transition ease-in">
            <span className=""></span>
            <span className=" ml-3 mt-1 text-sm font-sans font-bold animate-pulse md:bg-white/45 w-24 h-3 rounded-full">
            
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebarSkeleton;
