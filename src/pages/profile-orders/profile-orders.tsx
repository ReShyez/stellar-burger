import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { AppDispatch, useSelector, useDispatch } from '../../services/store';
import { getMyOrders, selectMyOrders } from '../../services/slices/orderSlice';
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора  заказы юзера. сделать санку с getOrdersApi*/
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrders());
  });
  const orders: TOrder[] = useSelector(selectMyOrders);

  return <ProfileOrdersUI orders={orders} />;
};
