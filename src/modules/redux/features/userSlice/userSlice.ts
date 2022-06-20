import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {IUser} from "../../../user/types";
import {makeApiCall} from "../../../global/services/api";
import {endpoint} from "../../../constants";

export interface UserState {
  users: IUser[] | []
}

const initialState: UserState = {
  users: []
};

export const deleteUserById = createAsyncThunk(
  'user/deleteUserById',
  async (id: string) => {
      try {
          await makeApiCall(`${endpoint}/${id}`, { method: 'DELETE', mode: 'cors' });
          return makeApiCall(endpoint, { method: 'GET', mode: 'cors' });
      } catch (err) {
          return [] as any;
      }
  }
);

export const editUser = createAsyncThunk(
    'user/editUser',
    async (userData: IUser) => {
        try {
            await makeApiCall(`${endpoint}/${userData._id}`, {
                method: 'PUT',
                body: JSON.stringify(userData)
            });
            return makeApiCall(endpoint, { method: 'GET', mode: 'cors' });
        } catch (err) {
            return null;
        }
    }
);

export const userSlice = createSlice({
  name: 'counter',
  initialState,

  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
       .addCase(editUser.fulfilled, (state, action) => {
           state.users = action.payload;
       })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.users = action.payload;
      })
  },
});

export const { addUsers } = userSlice.actions;

export const getUsers = (state: RootState) => state.users.users;

export default userSlice.reducer;
