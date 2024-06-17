import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import store from './store';
import { rootReducer } from './rootReducer';

describe('Тестирование стора и иницилизации слайсов', () => {
  test('Тест инициализации стора', () => {
    const canonical = store.getState();
    const expectedState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(canonical).toEqual(expectedState);
  });

  test('Тест инициализации слайса Ingredients', () => {
    const canonical = store.getState().ingredients;
    const initialState = {
      data: [],
      buns: [],
      sauses: [],
      mains: [],
      loading: false,
      error: null
    };
    expect(canonical).toEqual(initialState);
  });

  test('Тест инициализации слайса Feed', () => {
    const canonical = store.getState().feeds;
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    };
    expect(canonical).toEqual(initialState);
  });

  test('Тест инициализации слайса Constructor', () => {
    const canonical = store.getState().burgerConstructor;
    const initialState = {
      bun: null,
      ingredientes: []
    };
    expect(canonical).toEqual(initialState);
  });

  test('Тест инициализации слайса Order', () => {
    const canonical = store.getState().ordersSlice;
    const initialState = {
      orders: [],
      selectOrder: null,
      loading: false,
      error: null
    };
    expect(canonical).toEqual(initialState);
  });

  test('Тест инициализации слайса myOrder', () => {
    const canonical = store.getState().myOrderSlice;
    const initialState = {
      order: null,
      orderRequest: false,
      errorRequest: null
    };
    expect(canonical).toEqual(initialState);
  });

  test('Тест инициализации слайса User', () => {
    const canonical = store.getState().user;
    const initialState = {
      isAuthCheck: false,
      userInfo: null,
      userError: undefined,
      userRequest: false
    };
    expect(canonical).toEqual(initialState);
  });
});
