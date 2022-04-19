import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'state/store';
import axios, { AxiosError } from 'axios';

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

export const getUserData = createAsyncThunk('user/getUserData', async (_, { rejectWithValue }) => {
  const response = await axios.get('http://localhost:3001/tasklist/api/user');
  return response.data;
  // try {
  //   const response = await axios.get('http://localhost:3001/tasklist/api/user');
  //   return response.data;
  // } catch (err: unknown) {
  //   if (!(err as AxiosError).response) {
  //     throw new Error('There was an error retrieving the user');
  //   }
  //   return rejectWithValue((err as AxiosError).response?.data);
  // }
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
