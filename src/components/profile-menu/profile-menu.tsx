import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { AppDispatch, useSelector, useDispatch } from '../../services/store';
import { userLogout } from '../../services/slices/userSlice';
export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  // передать санку выхода из аккаунта
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
