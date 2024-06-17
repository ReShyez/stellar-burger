import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectBun,
  selectIngridients
} from '../../services/slices/burgerContructor';
import { AppDispatch, useSelector, useDispatch } from '../../services/store';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  UOrderRequest,
  removeOrderInform,
  selectMyOrder,
  sendOrder,
  setRequest
} from '../../services/slices/myOrderSlice';
import { selectAuthCheck } from '../../services/slices/userSlice';
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = {
    bun: useSelector(selectBun),
    ingredients: useSelector(selectIngridients)
  };
  const isAuth = useSelector(selectAuthCheck);
  const orderRequest = useSelector(UOrderRequest);
  const orderModalData = useSelector(selectMyOrder);

  const filterIngr: string[] | void = constructorItems.ingredients.map(
    (item) => item._id
  );
  const burgerIngredients: string[] = [];
  if (constructorItems.bun) {
    const bun = constructorItems.bun?._id;
    burgerIngredients.push(bun, ...filterIngr, bun);
  }

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
    } else if (isAuth && constructorItems.bun) {
      dispatch(sendOrder(burgerIngredients));
      dispatch(setRequest(true));
    } else if (isAuth && !constructorItems.bun) {
      alert('Добавьте булочки чтобы сделать заказ');
    }
  };
  const closeOrderModal = () => {
    dispatch(setRequest(false));
    dispatch(removeOrderInform());
  };
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
