/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { RootState } from '../store';
import type { PayloadAction, Slice } from '@reduxjs/toolkit';
interface IngridientsState {
  buns: TIngredient[];
  sauses: TIngredient[];
  mains: TIngredient[];
  data: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngridientsState = {
  data:[],
  buns: [],
  sauses: [],
  mains: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk<TIngredient[], void>(
  'ingredients/get',
  async () => getIngredientsApi()
);


export const ingredientsSlice  = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getIngredients.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(getIngredients.fulfilled,(state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
      state.buns = action.payload.filter((ingr) => ingr.type === 'bun');
      state.sauses = action.payload.filter((ingr) => ingr.type === 'sauce');
      state.mains = action.payload.filter((ingr) => ingr.type === 'main');
    })

    .addCase(getIngredients.rejected, (state) => {
      state.loading = false;
    });
  },
  
});

export const selectIngredients = (state: RootState) => state.ingredients.data;
export const selectBuns = (state: RootState) => state.ingredients.buns;
export const selectMains = (state: RootState) => state.ingredients.mains;
export const selectSauses = (state: RootState) => state.ingredients.sauses;
export const selectIngredientsLoading = (state: RootState) => state.ingredients.loading;
export const selectIngredientsError = (state: RootState) => state.ingredients.error;

export default ingredientsSlice.reducer;