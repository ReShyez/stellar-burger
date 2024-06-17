import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import userReducer, {
  getUser,
  registerUser,
  userLogin,
  updateUser,
  userLogout,
  initialState
} from './userSlice';
import { userInfo } from 'os';
describe('Order slice tests', () => {
  const testUser = {
    email: 'Test@test.test',
    name: 'Test Testov'
  };

  test('Тестируем состояния при ожидании отправки запроса регистрации', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthCheck: false,
      userRequest: true
    });
  });

  test('Тестируем успешную регистрацию', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: { testUser } }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userRequest: false,
      isAuthCheck: true,
      userInfo: { testUser }
    });
  });

  test('Тестируем неудачную регистрацию', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { massage: 'Faild to fetch registration' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthCheck: false,
      userRequest: false,
      userError: 'Faild to fetch registration'
    });
  });

  test('Тестируем состояния при ожидании входа пользователя', () => {
    const action = { type: userLogin.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthCheck: false,
      userRequest: true
    });
  });

  test('Тестируем успешный вход пользователя', () => {
    const action = {
      type: userLogin.fulfilled.type,
      payload: { user: { testUser } }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userRequest: false,
      isAuthCheck: true,
      userInfo: { testUser }
    });
  });

  test('Тестируем неудачный вход пользователя', () => {
    const action = {
      type: userLogin.rejected.type,
      error: { massage: 'Faild to login' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthCheck: false,
      userRequest: false,
      userError: 'Faild to login'
    });
  });

  test('Тестируем состояния при ожидании получении информации о пользователе', () => {
    const action = { type: getUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthCheck: false,
      userRequest: true
    });
  });

  test('Тестируем успешное получение пользователя', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: { testUser } }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userRequest: false,
      isAuthCheck: true,
      userInfo: { testUser }
    });
  });

  test('Тестируем неудачное получение пользователя', () => {
    const action = {
      type: getUser.rejected.type,
      error: { massage: 'Faild to get User' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userRequest: false,
      isAuthCheck: false,
      userError: 'Faild to get User'
    });
  });

  test('Тестируем состояния при обновлении пользователя', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthCheck: false,
      userRequest: true
    });
  });

  test('Тестируем успешное обновление пользователя', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: { testUser } }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userRequest: false,
      isAuthCheck: true,
      userInfo: { testUser }
    });
  });

  test('Тестируем неудачное обновление информации пользователя', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { massage: 'Faild to update User' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userRequest: false,
      isAuthCheck: false,
      userInfo: null,
      userError: 'Faild to update User'
    });
  });

  test('Тестируем состояния при ожидании при выходе пользователя', () => {
    const action = { type: userLogout.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userRequest: true,
      isAuthCheck: true
    });
  });

  test('Тестируем успешный выход пользователя', () => {
    const action = {
      type: userLogout.fulfilled.type
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userRequest: false,
      isAuthCheck: false,
      userInfo: null
    });
  });

  test('Тестируем неудачный выход пользователя ( logout)', () => {
    const action = {
      type: userLogout.rejected.type,
      error: { massage: 'Faild to logout' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userRequest: false,
      isAuthCheck: true,
      userError: 'Faild to logout'
    });
  });
});
