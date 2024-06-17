import myOrderReducer, { sendOrder, initialState } from './myOrderSlice';
import { TOrder } from '@utils-types';

describe('myOrder slice test', () => {
  const initialState = {
    order: null,
    orderRequest: false,
    errorRequest: null
  };

  test('Тестируем состояния при ожидании отправки ', () => {
    const action = { type: sendOrder.pending.type };
    const state = myOrderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: true,
      errorRequest: null
    });
  });

  test('Тестируем отправку заказа на сервер с полезной нагрузкой', () => {
    const testOrder: TOrder = {
      _id: '1',
      status: 'done',
      name: 'BurgerBuburger',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:10.000Z',
      number: 123,
      ingredients: ['1', '2', '3']
    };

    const action = {
      type: sendOrder.fulfilled.type,
      payload: { order: testOrder }
    };

    const state = myOrderReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      order: testOrder,
      orderRequest: false
    });
  });

  test('Тестирование неудачной отправки запроса с получением ошибки', () => {
    const action = {
      type: sendOrder.rejected.type,
      error: { massage: 'Faild to fetch order' }
    };

    const state = myOrderReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      errorRequest: 'Faild to fetch order'
    });
  });
});
