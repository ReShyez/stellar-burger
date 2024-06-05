/* eslint-disable prettier/prettier */
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { AppDispatch, useSelector, useDispatch } from '../../services/store';
import { getFeeds, selectOrders } from '../../services/slices/feedSlice';

import { RootState } from 'src/services/rootReducer';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);
  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI orders={orders} handleGetFeeds={() => {
      console.log('Обновили данные')
      dispatch(getFeeds())}} />
  );
};
