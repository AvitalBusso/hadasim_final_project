import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { getOwnerService, login } from "../services/storeOwnerService";

export const loginOwner = createAsyncThunk('storeOwner/login', async (user, { rejectWithValue }) => {
  try {
    console.log(user);
    const userData = await login(user);
    return userData.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});


export const getOwner = createAsyncThunk('storeOwner/getOwner', async (_, { rejectWithValue }) => {
  try {
    const userData = await getOwnerService();
    return userData.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});


const storeOwnerSlice = createSlice({
  name: 'storeOwner',
  initialState: {
    owner: {},
    error: '',
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginOwner.fulfilled, (state, action) => {
        state.owner = action.payload;
      })
      .addCase(loginOwner.rejected, (state, action) => {
        state.owner = {};
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })
      .addCase(getOwner.fulfilled, (state, action) => {
        state.owner = action.payload;
      })
      .addCase(getOwner.rejected, (state, action) => {
        state.owner = {};
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      });
  }
});

export default storeOwnerSlice.reducer