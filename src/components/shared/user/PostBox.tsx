import React, { useEffect, useState } from "react";

import axios from "axios";
import { FaRegComment } from "react-icons/fa";
import { IoMdHeartEmpty  } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { RiShareForwardFill } from "react-icons/ri";


import { HiDotsVertical } from "react-icons/hi";
import { FaLocationArrow } from "react-icons/fa6";
import CommentModal from "@/utils/CommentModal";
import ReportModal from "@/utils/ReportModal";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
import { BsBookmark } from "react-icons/bs";


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
  caption?: string;
  image?: {
    url: string;
  };
  user?: IUser;

  comments: [
    {
      user: IUser;
      comment: string;
    }
  ];
  postId: string;
  likes:  string[];
}

interface PostProps {
  post: Ipost;
  user: IUser| null;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostBox: React.FC<PostProps> = ({ post, user, update, setUpdate }) => {
  const [liked, setLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [likes, setLikes] = useState(0);
  const [commentModal, setCommentModal] = useState(false);
  const [reportModal,setReportModal] = useState(false);

  const [comment, setComment] = useState("");

  const userToken = localStorage.getItem("userToken");
  useEffect(() => {
    if (post.likes && user) {
      setLikes(post.likes.length);
      const userLiked = post.likes.some((like) => like === user._id);
      console.log("userLiked check", userLiked);

      if (userLiked) {
        setLiked(true);
      }
    }
  }, [likes, post]);

  const handleLike = () => {
    if (!userToken) {
      return;
    }
    setLiked(!liked);
    setUpdate(!update);
  };

  const submitLike = () => {
    try {
      // setLiked(!liked);
      // const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        toast.error("Sign in Required");
        return;
      }
      const postId = post._id;
      const response = axios.post(
        "http://localhost:5000/like-post",
        { postId },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
    } catch (err) {
      console.error("Error occured in add like in client", err);
    }
  };
  const removeLike = () => {
    try {
      // setLiked(!liked);
      // const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        toast.error("Sign in Required");
        return;
      }
      const postId = post._id;
      const response = axios.post(
        "http://localhost:5000/unLike-post",
        { postId },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
    } catch (err) {
      console.error("Error occured in remove like in client", err);
    }
  };

  const handleComment = async () => {
    try {
      if (!userToken) {
        toast.error("Sign in Required");
        return;
      }
      const postId = post._id;
      const response = await axios.post(
        "http://localhost:5000/user-comment",
        {
          comment,
          postId,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (response) {
        setComment("");
        console.log("Comment add res:", response.data.message);
        setUpdate(!update);
        toast.success(response.data.message);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.error("Error occured in add comment in client", err);
    }
  };
  return (
    <div>
      <Toaster />
      <section className="container  bg-postBox md:w-[500px] w-[280px] md:h-[650px] flex mt-[30px] rounded-lg md:ml-[250px] ml-[20px]">
        <div className="container">
          <CommentModal
            commentModal={commentModal}
            setCommentModal={setCommentModal}
            post={post}
          />
<ReportModal reportModal={reportModal} setReportModal={setReportModal} postId={post._id}/>
          <div className="flex  mt-3 ml-5">
            <span className="md:text-sm text-[10px] font-sans font-medium">
              {post.user?.username}
            </span>
            <span className="md:text-sm text-[10px] font-sans md:ml-2">
              .{" "}
              <span className="md:text-sm text-[10px] font-light text-white/60">
                1d
              </span>
            </span>

            <span
              className="text-sm font-sans ml-[160px] md:ml-auto mr-2 md:mt-1 mt-0 relative cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <HiDotsVertical style={{ fontSize: "18px" }} />
              {isOpen && (
                <div className="absolute mt-2 right-0 w-48 bg-postBox bg-transparent/80 text-white rounded-xl shadow-lg z-10 shadow-lightBlack">
                  <div
                    className="block px-4 py-2 text-sm hover:scale-110 cursor-pointer transition duration-200 hover:text-red-500  rounded-xl"
                    onClick={() => {
                      setReportModal(true) /* Add your report post logic here */
                    }}
                  >
                    Report Post
                  </div>
                  <div
                    className="block px-4 py-2 text-sm hover:scale-110 cursor-pointer transition duration-200 hover:text-fuchsia-400  rounded-xl"
                    onClick={() => {
                      setIsOpen(false); /* Add additional options here */
                    }}
                  >
                    Delete
                  </div>
                  <div
                    className="block px-4 py-2 text-sm hover:scale-110 hover:text-red-600 cursor-pointer transition duration-200  rounded-xl"
                    onClick={() => {
                      setIsOpen(false); /* Add additional options here */
                    }}
                  >
                    Close
                  </div>
                </div>
              )}
            </span>
          </div>

          <div className="flex md:mt-7 mt-3 md:ml-5 ml-2 md:text-[12px] text-[9px] font-light gap-3">
            <span className="font-semibold italic">{post.caption} </span>
            <span className="text-purple-400"> #scenicbeauty</span>
          </div>

          <div className="bg-black md:ml-4 ml-2 md:mt-5 mt-2 md:w-[468px] md:h-[400px] w-[264px]  rounded-md">
            <img
              className="w-full h-full object-cover rounded-md"
              src={post.image?.url}
              alt="img"
            />
          </div>

          <div className="flex">
            <div
              className="flex md:gap-2  mt-4 md:ml-5 ml-2 tex-sm"
              onClick={handleLike}
            >
              {liked ? (
                <span
                  className="text-myViolet/80 text-xl cursor-pointer"
                  onClick={removeLike}
                >
                  <IoMdHeart style={{ fontSize: "22px" }} />
                </span>
              ) : (
                <span
                  className="text-myViolet/80 text-xl cursor-pointer"
                  onClick={submitLike}
                >
                  <IoMdHeartEmpty  style={{ fontSize: "22px" }} />
                </span>
              )}
            </div>
            <div className="flex md:gap-2  mt-4 md:ml-5 ml-5 cursor-pointer">
              <span
                className="text-myViolet/80 text-xl"
                onClick={() => setCommentModal(true)}
              >
                <FaRegComment style={{ fontSize: "22px" }} />
              </span>
            </div>
            <div className="flex md:gap-2  mt-3.5 md:ml-5 ml-4 cursor-pointer">
              <span className="text-myViolet/80">
                <RiShareForwardFill style={{ fontSize: "26px" }} />
              </span>
            </div>

            <div className="flex-1 md:gap-2 md:mt-5 mt-4 md:ml-[328px] ml-[135px] cursor-pointer">
              <span className="text-myViolet/80">
                <BsBookmark style={{ fontSize: "22px" }} />
              </span>
            </div>
          </div>
          <div className="ml-5 mt-1 md:text-[13px] text-[10px]  font-sans text-white/50">
            <span className="">{likes} Likes</span>
          </div>

          <div
            className="md:ml-5 ml-2 mt-3 md:text-[13px] text-[10px] text-white/45 font-sans cursor-pointer"
            onClick={() => setCommentModal(true)}
          >
            <span>View all comments</span>
          </div>

          <div className=" flex md:ml-3 ml-2 md:mt-2 mt-3 mb-3 md:mb-0 gap-3">
            <input
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment..."
              type="text"
              className="rounded-full bg-black/25 border-0 md:text-[10px] text-[10px]  p-2 md:w-[420px] w-[265px] md:h-[35px] h-[20px]"
            />
            {comment.length < 1 ? (
              <button className="bg-fuchsia-900/20 rounded-full px-2 text-[12px] ml-2 text-white/15">
                <FaLocationArrow style={{ fontSize: "18px" }} />
              </button>
            ) : (
              <button
                className="bg-fuchsia-900 rounded-full px-2 text-[12px] ml-2"
                onClick={handleComment}
              >
                <FaLocationArrow style={{ fontSize: "18px" }} />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostBox;
