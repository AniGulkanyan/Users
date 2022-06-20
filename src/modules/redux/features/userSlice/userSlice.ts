import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {IUser} from "../../../user/types";
import {makeApiCall} from "../../../global/services/api";
import {endpoint} from "../../../constants";

export interface UserState {
  users: IUser[] | [],
  checkedCount: number,
}

const initialState: UserState = {
  users: [],
  checkedCount: 0,
};

export const deleteUserById = createAsyncThunk(
  'user/deleteUserById',
  async (id: string) => {
      try {
          await makeApiCall(`${endpoint}/${id}`, { method: 'DELETE', mode: 'cors' });
          return makeApiCall(endpoint, { method: 'GET', mode: 'cors' });
      } catch (err) {
          return [];
      }
  }
);

export const editUser = createAsyncThunk(
    'user/editUser',
    async (userData: IUser) => {
        const {_id, ...rest} = userData;
        try {
            await makeApiCall(`${endpoint}/${_id}`, {
                method: 'PUT',
                body: JSON.stringify(rest),
                mode: 'cors',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            });
            return makeApiCall(endpoint, { method: 'GET', mode: 'cors' });
        } catch (err) {
            return [];
        }
    }
);

export const loadUser = createAsyncThunk(
        'user/loadUser',
    async () => {
        try {
            return makeApiCall(endpoint, { method: 'GET' });
        } catch (err) {
            console.log('error', err)
        }
    }
)

export const addUser = createAsyncThunk(
    'user/addUser',
    async (userData: IUser) => {
        const {_id, ...rest} = userData;

        try {
            await makeApiCall(endpoint, {
                method: 'POST',
                body: JSON.stringify(rest),
                mode: 'cors',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            });
            return makeApiCall(endpoint, { method: 'GET', mode: 'cors' });
        } catch (err) {
            return [];
        }
    }
)

export const userSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
      checkUser: (state, action) => {
        if (state.checkedCount === 10) {
            alert('Max check limit exceeded');
            return;
        }

        state.users = state.users.map((user) => {
            if (user._id === action.payload._id) {
                user.checked = action.payload.checked;
                state.checkedCount = state.checkedCount + 1;
            }
            return user;
        });
      }
  },

  extraReducers: (builder) => {
    builder
        .addCase(editUser.fulfilled, (state, action) => {
            state.users = action.payload;
        })
        .addCase(deleteUserById.fulfilled, (state, action) => {
            state.users = action.payload;
        })
        .addCase(loadUser.fulfilled, (state, action) => {
            state.users = action.payload;
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.users = action.payload;
        })
  },
});

export const { checkUser } = userSlice.actions;

export const getUsers = (state: RootState) => state.users.users;

export default userSlice.reducer;
