import React from "react";
import Link from "next/link";
import "@/styles/globals.css";
import { IoMdClose } from "react-icons/io";
import dynamic from 'next/dynamic';
const Avatar = dynamic(() => import('@mui/material/Avatar'));
interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  // Add other properties as needed
}
interface Ipost {
  _id: string;
  comments: [
    {
      user: IUser;
      comment: string;
    }
  ];
  caption?: string;
  image?: {
    url: string;
  };
  user?: IUser;

  postId: string;
  likes: string[];
}

interface ICommentModalProps {
  commentModal: boolean;
  setCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  post: Ipost;
}

const CommentModal: React.FC<ICommentModalProps> = ({
  commentModal,
  setCommentModal,
  post,
}) => {
  console.log('post in comment modal',post);
  if (commentModal) {
    return (
      <div className="w-[500px] relative ">
         <div className="fixed top-0 left-0 w-full h-full bg-black/25 backdrop-blur-sm  z-40"></div>

        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="  flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <section className="flex justify-center mt-[700px]">
            <div className="bg-sidebarBlack w-[500px] h-[600px] flex flex-col rounded-2xl">
              <div className="ml-6 mt-3 flex justify-between">
                <span className="md:text-sm text-[10px] font-sans font-medium mt-1">
                  {post.user?.username}
                  <span className="md:text-sm text-[10px] font-sans md:ml-2">
                  . 
                  <span className="md:text-sm text-[10px] ml-2 font-light text-white/60">
                    1d
                  </span>
                </span>
                </span>
              

                <div
                  className="flex mr-4 cursor-pointer "
                  onClick={() => setCommentModal(false)}
                >
                  <IoMdClose style={{ fontSize: "30px" }} />
                </div>
              </div>
              <div className="flex ml-5  mt-3 md:text-[12px] text-[9px] font-light gap-3">
                <span className="font-semibold italic">{post.caption} </span>
                <span className="text-purple-400"> #scenicbeauty</span>
              </div>
              {post.comments.map((comment) => (
                <div className="mt-10 ml-5 ">
                  <div className=" flex ">
                    <div className="bg-white/85 w-8 h-8 rounded-full mr-7">
                      <Avatar
                        alt="Remy Sharp"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      />
                    </div>
                    <div className="text-[12px] font-semibold">
                      {comment.user.username}
                    </div>
                    <div className="text-[13px] max-w-96 flex-grow font-sans  ml-4 ">
                      {comment.comment}
                    </div>
                    {/* <div className="text-end ml-auto text-[12px]">Like</div> */}
                  </div>
                  
              
                  <div className="flex gap-3 ml-10">
                      <span className="text-[10px] text-white/50 ">18 h</span>
                      {/* <div className="text-[10px] text-white/50 ">34 Likes</div> */}
                      <span className="text-[10px] text-white/50 ">Report</span>
                  </div>
                  
                </div>
                
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
};

export default CommentModal;
