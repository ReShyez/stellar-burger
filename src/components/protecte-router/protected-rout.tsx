import React, { ReactNode } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AppDispatch, useSelector, useDispatch } from '../../services/store';
import { selectAuthCheck } from '../../services/slices/userSlice';
interface IProtectedRoutProp {
  children: ReactNode;
  requiresAuth: boolean;
}

export const ProtectedRoute = ({
  children,
  requiresAuth
}: IProtectedRoutProp) => {
  const isAuth = useSelector(selectAuthCheck);
  if (requiresAuth) {
    return isAuth ? children : <Navigate to='/login' />;
  } else {
    return isAuth ? <Navigate to='/' /> : children;
  }
};
