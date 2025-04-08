import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { addSupplier, getAllSupplier, loginUser } from '../services/supplierService'

export const login = createAsyncThunk('supplier/login', async (user, { rejectWithValue }) => {
  try {
    const userData = await loginUser(user);
    return userData.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});
export const signUp = createAsyncThunk('supplier/addSupplier', async (user, { rejectWithValue }) => {
  try {
    const userData = await addSupplier(user);
    return userData.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500, 
    });
  }
});


export const getAll = createAsyncThunk('supplier/getAll', async (_, { rejectWithValue }) => {
  try {
    const userData = await getAllSupplier();
    return userData.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500, 
    });
  }
});

const supplierSlice = createSlice({
  name: 'supplier',
  initialState: {
    currentUser: {},
    suppliersList: [],
    error: '',
  },

  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    })
    .addCase(login.rejected, (state, action) => {
      state.currentUser = {};
      state.error = {
        message: action.payload.message,
        status: action.payload.status,
      };
    })

    .addCase(signUp.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    })
    .addCase(signUp.rejected, (state, action) => {
      state.error = {
        message: action.payload.message,
        status: action.payload.status,
      };
    })

    .addCase(getAll.fulfilled, (state, action) => {
      state.suppliersList = action.payload;
    })
    .addCase(getAll.rejected, (state, action) => {
      state.error = {
        message: action.payload.message,
        status: action.payload.status,
      };
    })
  }
})

export default supplierSlice.reducer