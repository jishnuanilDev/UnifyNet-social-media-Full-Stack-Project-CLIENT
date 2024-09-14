import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define your types
interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  profilePic: string;
  isPremium: boolean;
}

interface IMessage {
  _id: string;
  chat: ICommunity["_id"];
  sender: IUser["_id"];
  message: string;
  status: "seen" | "delivered";
  createdAt: Date;
  updatedAt: Date;
}

interface ICommunity {
  name: string;
  _id: string;
  participants: IUser[];
  admin: IUser;
  messages: IMessage[];
  lastMessage?: IMessage;
  createdAt: Date;
  updatedAt: Date;
}

const initialState: ICommunity | null = null;
const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    setReduxCommunity: (state, action: PayloadAction<ICommunity | null>) => {
      return action.payload;
    },
    removeUserFromCommunity: (
      state,
      action: PayloadAction<ICommunity | string | null>
    ) => {
      if (state) {
        state.participants = state.participants.filter(
          (participant: any) => participant._id !== action.payload
        );
      }
    },

    addUserToCommunity: (state, action) => {
      if (state) {
        state.participants.push(action.payload);
        console.log("Adding User:", action.payload);
      }
    },
    updateReduxCommunity: (state, action: PayloadAction<ICommunity>) => {
      if (state && state._id === action.payload._id) {
        return { ...state, ...action.payload };
      }
      return state;
    },
  },
});

export const {
  setReduxCommunity,
  updateReduxCommunity,
  removeUserFromCommunity,
  addUserToCommunity,
} = communitySlice.actions;

export default communitySlice.reducer;
