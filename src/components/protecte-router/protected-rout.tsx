import React, { ReactNode } from 'react';
import { Outlet, Navigate, useLoaderData, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  if (requiresAuth) {
    return isAuth ? (
      children
    ) : (
      <Navigate replace to='/login' state={{ from: location }} />
    );
  }
  if (!requiresAuth) {
    const from = location.state?.from || { pathname: '/' };
    return !isAuth ? children : <Navigate replace to={from} />;
  }
};
