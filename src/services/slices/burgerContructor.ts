/* eslint-disable prettier/prettier */
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';
export interface IBurgerConstructor {
  bun: TConstructorIngredient | null;
  ingredientes: TConstructorIngredient[];
}

export const initialState: IBurgerConstructor = {
  bun: null,
  ingredientes: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setIngridients: {
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...ingredient } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
          console.log(state.bun);
        } else {
          state.ingredientes.push(action.payload);
          console.log(state.ingredientes);
        }
      }
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      state.ingredientes = state.ingredientes.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    upIngridient: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.ingredientes.findIndex(
        (ingr) => ingr.id === action.payload.id
      );
      if(index > 0) {
        const [findIngr] = state.ingredientes.splice(index, 1);
        state.ingredientes.splice(index - 1, 0, findIngr)
      }
      
    },
    downIngridient: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.ingredientes.findIndex(
        (ingr) => ingr.id === action.payload.id
      );
      // Проверяем, что элемент не находится на последней позиции
      if (index < state.ingredientes.length - 1) {
        const [findIngr] = state.ingredientes.splice(index, 1);
        state.ingredientes.splice(index + 1, 0, findIngr);
      }
    }
  }
});
const selectConstState = (state: RootState) => state.burgerConstructor;

const selectBun = createSelector(
  [selectConstState],
  (state) => state.bun
);

const selectIngridients = createSelector(
  [selectConstState],
  (state) => state.ingredientes
);
export { selectBun, selectIngridients };
export const { setIngridients, removeIngredient, upIngridient, downIngridient } = constructorSlice.actions;
export default constructorSlice.reducer;
