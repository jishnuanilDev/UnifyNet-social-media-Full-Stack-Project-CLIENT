
import "@/styles/globals.css";
const PostBoxSkeleton: React.FC = () => {
  return (
    <div className="mb-7">
      <section className="container  bg-midBlack md:w-[500px] w-[310px] md:h-[650px] flex mt-[30px] rounded-lg md:ml-[250px] ml-[10px]">
        <div className="container">
          <div className="flex  mt-3 md:ml-5 animate-pulse">
            {/* avatar */} <span className=" ml-2 md:ml-0 mr-4 bg-white/45 h-6 w-6 rounded-full"></span>
            <span className="md:bg-white/45 h-3 w-28 rounded-full md:mt-0 mt-1">
         
            </span>
            <span className="md:bg-white/45 h-3 w-20 rounded-full md:mt-0 ml-2 mt-1.5 text-white/60">
            </span>
            <span className="text-sm font-sans ml-[160px] md:ml-auto mr-2 md:mt-1 mt-0 relative cursor-pointer"></span>
          </div>

          <div className="flex md:mt-7 mt-3 md:ml-5 ml-2 md:text-[12px] text-[9px] font-light gap-3 animate-pulse">
            <span className="bg-white/45 h-2 w-20 rounded-full "></span>
            <span className="bg-white/45 h-2 w-20 rounded-full "></span>
          </div>

          <div className= "animate-pulse bg-white/10 md:ml-4 ml-1 md:mt-5 mt-2 md:w-[468px] md:h-[400px] h-[300px] w-[300px]  rounded-md"></div>

          <div className="flex animate-pulse">
            <div className="flex md:gap-2  mt-4 md:ml-5 ml-2 tex-sm">
              <span className="bg-white/45 h-7 w-7 rounded-full">
                
              </span>
            </div>
            <div className="flex md:gap-2  mt-4 md:ml-5 ml-5 cursor-pointer">
              <span className="bg-white/45 h-7 w-7 rounded-full"></span>
            </div>
            <div className="flex md:gap-2  mt-4 md:ml-5 ml-4 cursor-pointer">
              <span className="bg-white/45 h-7 w-7 rounded-full"></span>
            </div>

            <div className="  flex-1 md:gap-2 md:mt-5 mt-4 md:ml-[328px] ml-[170px] cursor-pointer">
              <span className="bg-white/45 h-7 w-7 rounded-full"></span>
            </div>
          </div>
          <div className="md:ml-5 ml-2 mt-1 animate-pulse">
            <span className="bg-white/45 h-3 rounded-full text-[8px] text-white/0">Likes likes</span>
          </div>

          <div className="animate-pulse md:ml-5 ml-2 mt-3 md:text-[13px] text-[10px] text-white/45 font-sans cursor-pointer">
          <span className="bg-white/45 h-3 rounded-full text-[6px] text-white/0">comment comment comment</span>
          </div>

          <div className=" animate-pulse flex md:ml-3 ml-2 md:mt-2 mt-3 mb-3 md:mb-0 gap-3">
        <div className="bg-white/20 h-7 w-96 rounded-full">

        </div>

            <button className="bg-white/20 h-7 w-12 rounded-full ml-2">
             
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostBoxSkeleton;
