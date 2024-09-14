import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import "@/styles/globals.css";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "@/configs/axiosInstance";
import dynamic from "next/dynamic";
const Avatar = dynamic(() => import("@mui/material/Avatar"));
interface IUser {
  _id: string;
  profilePic:string;
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
      _id: string;
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

interface IRepliesModalProps {
  commentModal: boolean;
  trigger: boolean;
  commentId: string;
  setRepliesModal: React.Dispatch<React.SetStateAction<boolean>>;
  comment: {
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
  };
}

const RepliesModal: React.FC<IRepliesModalProps> = ({
  comment,
  trigger,
  setRepliesModal,
  commentId,
}) => {
  const [replies, setReplies] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const result = await axiosInstance.get(`/fetch-replies/${commentId}`);
        if (result) {
          console.log(
            "replies based on comment id in client",
            result.data.replies
          );
          setReplies(result.data.replies);
        }
      } catch (err) {
        console.log("Error occured in fetching replies in client side");
      }
    };

    fetchReplies();
  }, [trigger,commentId]);
  return (
    <>
      <span  onClick={onOpen} className="text-[10px] text-white/50 cursor-pointer">
        View replies( {comment.replies.length} )
      </span>
      <Modal
        className="bg-sidebarBlack "
        backdrop="opaque"
        isOpen={isOpen}
        size="md"
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <section className="flex justify-center md:mt-[700px]  ">
                  <div className="bg-sidebarBlack md:w-[500px] w-[300px] md:h-[600px] h-[400px] flex flex-col rounded-2xl  overflow-y-scroll scrollbar-hide">
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex-1 text-center ml-8">
                        <span className="font-mono font-semibold italic">
                          Replies
                        </span>
                      </div>
              
                    </div>
                    <div className="ml-6 mt-3 flex justify-between ">
                      <span className="md:text-sm text-[10px] font-sans font-medium mt-1">
                        {/* {comment.user?.username} */}
                        {/* <span className="md:text-sm text-[10px] font-sans md:ml-2">
                  .
                  <span className="md:text-sm text-[10px] ml-2 font-light text-white/60">
                    1d
                  </span>
                </span> */}
                      </span>

                      {/* <div
                className="flex mr-4 cursor-pointer "
                onClick={() => setRepliesModal(false)}
              >
                <IoMdClose style={{ fontSize: "30px" }} />
              </div> */}
                    </div>
                    <div className="flex ml-5  mt-3 md:text-[12px] text-[9px] font-light gap-3 ">
                      {/* <span className="font-semibold italic">{comment.comment} </span> */}
                    </div>
                    <div className=" overflow-y-auto scrollbar-hide">
                      {replies.map((reply,index) => (
                        <div key={index} className="mt-10 ml-5">
                          <div className=" flex ">
                            <div className="bg-white/85 w-8 h-8 rounded-full mr-7">
                            {reply.user.profilePic ? (
                <Avatar
                  style={{ height: "25px", width: "25px" }}
                  alt="Remy Sharp"
                  src={reply.user.profilePic}
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
                              {reply.user.username}
                            </div>
                            <div className="text-[13px] max-w-96 flex-grow font-sans  ml-4  ">
                              {reply.commentReply}
                            </div>
                            {/* <div className="text-end ml-auto text-[12px]">Like</div> */}
                          </div>

                          <div className="flex gap-3 ml-10">
                            <span className="text-[10px] text-white/50 ">
                              18 h
                            </span>
                            {/* <div className="text-[10px] text-white/50 ">34 Likes</div> */}
                            <span className="text-[10px] text-white/50 ">
                              Report
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RepliesModal;
