/* eslint-disable prettier/prettier */
import { TOrder, TOrdersData } from '@utils-types';
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TFeedsResponse, getFeedsApi } from '../../utils/burger-api';

export interface FeedsState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

export const initialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null,
};

export const getFeeds = createAsyncThunk<TFeedsResponse>(
  'feeds/get',
  async () => getFeedsApi()
);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action: PayloadAction<TFeedsResponse>) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch feeds';
      });
  }
})

const selectFeedsState = (state: RootState) => state.feeds;

const selectOrders = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.orders
);

const selectTotal = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.total
);

const selectTotalToday = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.totalToday
);

const selectFeedsLoading = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.loading
);

const selectFeedsError = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.error
);
export { selectOrders, selectTotal, selectTotalToday, selectFeedsLoading, selectFeedsError}
export default feedsSlice.reducer