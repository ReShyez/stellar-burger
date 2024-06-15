import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredients';
import { feedsSlice } from './slices/feedSlice';
import { constructorSlice } from './slices/burgerContructor';
import { orderSlice } from './slices/orderSlice';
import { userSlice } from './slices/userSlice';
import { myOrderSlice } from './slices/myOrderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  feeds: feedsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  ordersSlice: orderSlice.reducer,
  myOrderSlice: myOrderSlice.reducer,
  user: userSlice.reducer
});
export type RootState = ReturnType<typeof rootReducer>;
