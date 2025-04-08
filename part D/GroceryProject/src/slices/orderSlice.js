import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { addNewOrder, getOrders, getOrdersBySupplierId, updateToCompleted, updateToProcess } from "../services/orderService";

export const getAllOrders = createAsyncThunk('orders/getOrdersBySupplierId', async (id, { rejectWithValue }) => {
  try {
    const ordersList = await getOrdersBySupplierId(id);
    return ordersList.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});

export const getAllOwnerOrders = createAsyncThunk('orders/getAllOrders', async (_, { rejectWithValue }) => {
  try {
    const ordersList = await getOrders();
    return ordersList.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});

export const updateOrderStatusToCompleted = createAsyncThunk('orders/updateStatusToCompleted', async (orderId, { rejectWithValue }) => {
  try {
    const ordersList = await updateToCompleted(orderId);
    return ordersList.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});

export const updateOrderStatusToProcess = createAsyncThunk('orders/updateStatusToProcess', async (orderId, { rejectWithValue }) => {
  try {
    const ordersList = await updateToProcess(orderId);
    return ordersList.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});

export const addOrder = createAsyncThunk('orders/addOrder', async (order, { rejectWithValue }) => {
  try {
    const productsList = await addNewOrder(order);
    return productsList.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    ordersList: [],
    loading: false,
    error: '',
  },

  extraReducers: (builder) => {
    builder

      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.ordersList = action.payload || [];
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(getAllOwnerOrders.fulfilled, (state, action) => {
        state.ordersList = action.payload || [];
      })
      .addCase(getAllOwnerOrders.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(updateOrderStatusToCompleted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatusToCompleted.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.ordersList.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.ordersList[index].status = 'COMPLETED';
        }
      })
      .addCase(updateOrderStatusToCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrderStatusToProcess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatusToProcess.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.ordersList.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.ordersList[index].status = 'IN_PROCESS';
        }
      })
      .addCase(updateOrderStatusToProcess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(addOrder.fulfilled, (state, action) => {
        state.ordersList.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })
  }
})

export default orderSlice.reducer