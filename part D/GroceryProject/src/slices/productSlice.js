import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { addNewProducts, getAll } from "../services/productService";

export const addProducts = createAsyncThunk('products/addProducts', async (products, { rejectWithValue }) => {
  try {
    const productsList = await addNewProducts(products);
    return productsList.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});

export const getAllPeoducts = createAsyncThunk('products/all', async (_, { rejectWithValue }) => {
  try {
    const productsList = await getAll();
    return productsList.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});


const productSlice = createSlice({
  name: 'product',
  initialState: {
    productsList: [],
    error: '',
  },

  extraReducers: (builder) => {
    builder

      .addCase(addProducts.fulfilled, (state, action) => {
        state.productsList.push(action.payload);
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(getAllPeoducts.fulfilled, (state, action) => {
        state.productsList = action.payload || [];
      })
      .addCase(getAllPeoducts.rejected, (state, action) => {

        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })
  }
})

export default productSlice.reducer