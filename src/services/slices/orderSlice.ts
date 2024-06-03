import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '../rootReducer';

interface OrderState {
  orders: TOrder[];
  selectOrder: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectOrder: null,
  loading: false,
  error: null
};

export const getMyOrders = createAsyncThunk('orders/get', async () =>
  getOrdersApi()
);

export const getSelectOrder = createAsyncThunk(
  'order/get',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {
    removeItem: (state) => {
      state.selectOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Получение информации по однуму заказу
      .addCase(getSelectOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSelectOrder.fulfilled, (state, action) => {
        state.selectOrder = action.payload.orders[0];
        state.loading = false;
      })
      .addCase(getSelectOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })

      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  }
});

const selectOrders = (state: RootState) => state.ordersSlice;

const selectMyOrders = createSelector([selectOrders], (state) => state.orders);
const selectPickOrder = createSelector(
  [selectOrders],
  (state) => state.selectOrder
);
export { selectMyOrders, selectPickOrder };
export default orderSlice.reducer;
