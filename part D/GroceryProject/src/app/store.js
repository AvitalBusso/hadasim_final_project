import { configureStore } from '@reduxjs/toolkit'
import orderReducer from '../slices/orderSlice'
import productReducer from '../slices/productSlice'
import storeOwnerReducer from '../slices/storeOwnerSlice'
import supplierReducer from '../slices/supplierSlice'

export const store = configureStore({
    reducer: {
        order: orderReducer,
        product: productReducer,
        storeOwner: storeOwnerReducer,
        supplier: supplierReducer
    }
});