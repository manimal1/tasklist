import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'state/store';
import axios from 'axios';

interface UserSlice {
  id: string;
  name: string;
  image_url: string;
}

const initialState: UserSlice = {
  id: '',
  name: '',
  image_url: '',
};

export const getUserData = createAsyncThunk('user/getUserData', async () => {
  const response = await axios.get('http://localhost:3001/tasklist/api/user');
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, { payload: userData }: PayloadAction<UserSlice>) => ({
      ...state,
      ...userData,
    }));
  },
});

export const getUserId = (state: RootState) => state.user.id;
export const getUserName = (state: RootState) => state.user.name;
export const getUserImage = (state: RootState) => state.user.image_url;

export default userSlice.reducer;
