// slices/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  refreshToken,
  TRegisterData,
  TLoginData,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import { TUser } from '@utils-types';
import { RootState } from '../rootReducer';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface IUserState {
  isAuthCheck: boolean;
  userInfo: TUser | null;
  userError: string | undefined;
  userRequest: boolean;
}

export const initialState: IUserState = {
  isAuthCheck: false,
  userInfo: null,
  userError: undefined,
  userRequest: false
};

export const getUser = createAsyncThunk('user/fetchUser', async () =>
  getUserApi()
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => registerUserApi(data)
);

export const userLogin = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    try {
      const user = await loginUserApi(data);
      setCookie('accessToken', user.accessToken);
      localStorage.setItem('refreshToken', user.refreshToken);
      return user;
    } catch (error) {
      console.log('Неудалось войти. Ошибка:', error);
      throw error;
    }
  }
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => await updateUserApi(data)
);

export const userLogout = createAsyncThunk('user/userLogout', async () => {
  try {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.clear();
  } catch (error) {
    console.log('userLogout', error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthCheck = false;
      state.userInfo = null;
    }
  },
  extraReducers: (builder) => {
    builder
      //Получение инфо пользователя польователя
      .addCase(getUser.pending, (state) => {
        state.isAuthCheck = false;
        state.userRequest = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthCheck = true;
        state.userRequest = false;
        state.userInfo = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthCheck = false;
        state.userRequest = false;
        state.userError = action.error.message || 'Faild to get User';
      })
      //регистрация
      .addCase(registerUser.pending, (state) => {
        state.isAuthCheck = false;
        state.userRequest = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.userRequest = false;
        state.isAuthCheck = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userRequest = false;
        state.isAuthCheck = false;
        state.userError = action.error.message || 'Faild to fetch registration';
      })
      //Логин
      .addCase(userLogin.pending, (state) => {
        state.userRequest = true;
        state.isAuthCheck = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.userRequest = false;
        state.isAuthCheck = true;
        state.userInfo = action.payload.user;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userRequest = false;
        state.isAuthCheck = false;
        state.userError = action.error.message || 'Faild to login';
      })
      //update
      .addCase(updateUser.pending, (state) => {
        state.userRequest = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userRequest = false;
        state.isAuthCheck = true;
        state.userInfo = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userRequest = false;
        state.userInfo = null;
        state.isAuthCheck = false;
        state.userError = action.error.message || 'Faild to update User';
      })
      //выход
      .addCase(userLogout.pending, (state) => {
        state.userRequest = true;
        state.isAuthCheck = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.userRequest = false;
        state.isAuthCheck = false;
        state.userInfo = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.userRequest = false;
        state.isAuthCheck = true;
        state.userError = action.error.message || 'Faild to logout';
      });
  }
});
const selectUser = (state: RootState) => state.user;
const selectUserData = (state: RootState) => state.user.userInfo;
const selectAuthCheck = (state: RootState) => state.user.isAuthCheck;
const selectUserRequest = (state: RootState) => state.user.userRequest;
export default userSlice.reducer;
export { selectUserData, selectAuthCheck, selectUserRequest, selectUser };
