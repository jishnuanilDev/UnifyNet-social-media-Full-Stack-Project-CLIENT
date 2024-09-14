import React, { useState } from "react";
import Link from "next/link";
import "@/styles/globals.css";
import { IoMdClose } from "react-icons/io";
import dynamic from "next/dynamic";
import AddReplyComment from "@/components/cards/user/comment/AddReplyComment";
import RepliesModal from "./RepliesModal";
const Avatar = dynamic(() => import("@mui/material/Avatar"));
interface IUser {
  _id: string;
  profilePic: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  savedPost: string[];
  // Add other properties as needed
}
interface Ipost {
  _id: string;
  caption?: string;
  image?: {
    url: string;
  };
  user?: IUser;

  comments: [
    {
      _id: string;
      user: IUser;
      comment: string;
      replies: [
        {
          _id: string;
          user: string;
          commentReply: string;
        }
      ];
    }
  ];
  postId: string;
  likes: string[];
  createdAt: Date;
}

interface ICommentModalProps {
  commentModal: boolean;
  setCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  post: Ipost;
}

const CommentModal: React.FC<ICommentModalProps> = ({
  commentModal,
  setCommentModal,
  post,
}) => {
  console.log("post in comment modal", post);
  const [repliesModal, setRepliesModal] = useState(false);
  const [trigger, setTrigger] = useState(false);
  if (commentModal) {
    return (
      <div className="w-[500px] relative ">
        <div className="fixed top-0 left-0 w-full h-full bg-black/25 backdrop-blur-sm  z-40"></div>

        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="  flex overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <section className="flex justify-center md:mt-[700px]  ">
            <div className="bg-sidebarBlack md:w-[500px] w-[300px] md:h-[600px] h-[400px] flex flex-col rounded-2xl  overflow-y-scroll scrollbar-hide">
              <div className="flex items-center justify-between mt-2">
                <div className="flex-1 text-center ml-8">
                  <span className="font-mono font-semibold italic">
                    Comments
                  </span>
                </div>
                <div
                  className=" mr-4 cursor-pointer"
                  onClick={() => setCommentModal(false)}
                >
                  <IoMdClose style={{ fontSize: "30px" }} />
                </div>
              </div>

              <div className="ml-6 mt-3 flex justify-between ">
                <span className="md:text-sm text-[10px] font-sans font-medium mt-1">
                  {post.user?.username}
                  <span className="md:text-sm text-[10px] font-sans md:ml-2">
                    .
                    <span className="md:text-sm text-[10px] ml-2 font-light text-white/60">
                      1d
                    </span>
                  </span>
                </span>

                {/* <div
                  className="flex mr-4 cursor-pointer "
                  onClick={() => setCommentModal(false)}
                >
                  <IoMdClose style={{ fontSize: "30px" }} />
                </div> */}
              </div>
              <div className="flex ml-5  mt-3 md:text-[12px] text-[9px] font-light gap-3 ">
                <span className="font-semibold italic">{post.caption} </span>
                <span className="text-purple-400"> #scenicbeauty</span>
              </div>

              <div className=" overflow-y-auto scrollbar-hide">
                {post.comments.map((comment, index) => (
                  <div key={index} className="mt-10 ml-5">
                    <div className=" flex ">
                      <div className="bg-white/85 w-8 h-8 rounded-full mr-7">
                        {comment.user.profilePic ? (
                          <Avatar
                            style={{ height: "25px", width: "25px" }}
                            alt="Remy Sharp"
                            src={comment.user.profilePic}
                          />
                        ) : (
                          <Avatar
                            style={{ height: "25px", width: "25px" }}
                            alt="Remy Sharp"
                            src="https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
                          />
                        )}
                      </div>
                      <div className="text-[12px] font-semibold">
                        {comment.user.username}
                      </div>
                      <div className="text-[13px] max-w-96 flex-grow font-sans  ml-4  ">
                        {comment.comment}
                      </div>
                      {/* <div className="text-end ml-auto text-[12px]">Like</div> */}
                    </div>

                    <div className="flex gap-3 ml-10">
                      <span className="text-[10px] text-white/50 ">18 h</span>
                      {/* <div className="text-[10px] text-white/50 ">34 Likes</div> */}
                      <span className="text-[10px] text-white/50 ">Report</span>

                      <span className="text-[10px] text-white/50 ">
                        <AddReplyComment
                          setTrigger={setTrigger}
                          commentId={comment._id}
                          setUpdate={function (
                            value: React.SetStateAction<boolean>
                          ): void {
                            throw new Error("Function not implemented.");
                          }}
                        />
                      </span>

                      <RepliesModal
                        comment={comment}
                        trigger={trigger}
                        commentId={comment._id}
                        setRepliesModal={setRepliesModal}
                        commentModal={false}
                      />
                      {/* <span
                        className="text-[10px] text-white/50 cursor-pointer"
                    
                      >
                        View replies( {comment.replies.length} )
                      </span> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
};

export default CommentModal;
