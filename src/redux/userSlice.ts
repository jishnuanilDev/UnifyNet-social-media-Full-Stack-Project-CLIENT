import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  profilePic: string;
  isPremium: boolean;
}

const initialState: IUser | null = null;

const userSlice = createSlice({
  name: 'userRedux',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      return action.payload;
    },
    clearUser: () => {
      return null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
