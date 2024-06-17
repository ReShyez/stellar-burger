import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { RootState } from '../rootReducer';

interface initialState {
  order: TOrder | null;
  orderRequest: boolean;
  errorRequest: string | null;
}

export const initialState: initialState = {
  order: null,
  orderRequest: false,
  errorRequest: null
};

export const sendOrder = createAsyncThunk(
  'myOrder/post',
  async (data: string[]) => orderBurgerApi(data)
);

export const myOrderSlice = createSlice({
  name: 'porder/post',
  initialState,
  reducers: {
    setRequest: (state, action) => {
      state.errorRequest = action.payload;
    },
    removeOrderInform: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.orderRequest = true;
        state.errorRequest = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.errorRequest =
          (action.error.message as string) || 'Faild to fetch order';
      });
  }
});

const selectUserOrders = (state: RootState) => state.myOrderSlice;

const selectMyOrder = createSelector(
  [selectUserOrders],
  (state) => state.order
);
const UOrderRequest = createSelector(
  [selectUserOrders],
  (state) => state.orderRequest
);
export { selectMyOrder, UOrderRequest };
export const { setRequest, removeOrderInform } = myOrderSlice.actions;
export default myOrderSlice.reducer;
