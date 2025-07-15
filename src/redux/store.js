import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './feaures/cart/cartSlice'
import booksApi from './feaures/books/booksApi'
import ordersApi from './feaures/orders/ordersApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,// this is used to add the booksApi reducer to the store
    [ordersApi.reducerPath]: ordersApi.reducer, // Add the ordersApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware,ordersApi.middleware),// 
})