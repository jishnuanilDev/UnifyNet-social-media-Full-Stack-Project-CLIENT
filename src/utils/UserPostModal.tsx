import React from "react";
import dynamic from 'next/dynamic';

const UserPostBox = dynamic(() => import('@/components/shared/user/UserPostBox'), {
  loading: () => <p>Loading...</p>, // Optional loading component
});

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

const UserPostModal: React.FC<PostProps> = ({
  postImg,
  user,
  userPost,
  update,
  setUpdate,
}) => {
  if (update) {
    return (
      <div className="w-[500px] relative ">
        <div className="fixed top-0 left-0 w-full h-full bg-black/25 bg-opacity-50  z-40"></div>

        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="  flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="flex justify-center mx-auto">
            <UserPostBox
              postImg={postImg}
              userPost={userPost}
              user={user}
              update={update}
              setUpdate={setUpdate}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default UserPostModal;
