import React from "react";
import dynamic from "next/dynamic";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
const UserPostBox = dynamic(
  () => import("@/components/shared/user/UserPostBox"),
  {
    loading: () => <p>Loading...</p>, // Optional loading component
  }
);

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

interface PostProps {
  postImg: string;
  userPost: Ipost;
  user: IUser | null;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiscoverPostModal: React.FC<PostProps> = ({
  postImg,
  user,
  userPost,
  update,
  setUpdate,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="">
      <div className="w-70 h-96 bg-gray-300" onClick={onOpen}>
      <img
                className="w-full h-full  object-cover"
                src={userPost.image.url}
                alt="img"
              />
      </div>
  
      <Modal
        className="bg-sidebarBlack/10 "
        backdrop="opaque"
        isOpen={isOpen}
        size="xl"
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
              <ModalBody className="flex justify-center items-center ">
                {/* Wrapping the content in a div for better control */}
                <div className="w-full max-w-3xl">
                  <UserPostBox
                    postImg={postImg}
                    userPost={userPost}
                    user={user}
                    update={update}
                    setUpdate={setUpdate}
                  />
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DiscoverPostModal;
