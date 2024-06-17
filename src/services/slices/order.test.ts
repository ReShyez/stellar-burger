import orderReducer, {
  getMyOrders,
  getSelectOrder,
  initialState
} from './orderSlice';

describe('Order slice tests', () => {
  const testOrder = {
    _id: '1',
    status: 'done',
    name: 'BurgerBuburger',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:10.000Z',
    number: 123,
    ingredients: ['1', '2', '3']
  };

  test('Тестируем состояния при ожидании отправки запроса заказов пользователя', () => {
    const action = { type: getMyOrders.pending.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  test('Тестируем успешное получение заказов пользователя', () => {
    const action = {
      type: getMyOrders.fulfilled.type,
      payload: [
        { ...testOrder, _id: '1' },
        { ...testOrder, _id: '2', number: 3231 },
        { ...testOrder, _id: '3', number: 5121 }
      ]
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: [
        { ...testOrder, _id: '1' },
        { ...testOrder, _id: '2', number: 3231 },
        { ...testOrder, _id: '3', number: 5121 }
      ],
      loading: false
    });
  });

  test('Тестируем неудачное получение заказов пользователя', () => {
    const action = {
      type: getMyOrders.rejected.type,
      error: { massage: 'Faild to getMyOrders' }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Faild to getMyOrders'
    });
  });

  test('Тестируем состояния ожидания при отправке запроса на получение конкретного заказа', () => {
    const action = { type: getSelectOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  test('Тестируем успешное получение конкретного заказа', () => {
    const action = {
      type: getSelectOrder.fulfilled.type,
      payload: { orders: [testOrder] }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      selectOrder: testOrder,
      loading: false
    });
  });

  test('Тестируем провал получения конкретного заказа', () => {
    const action = {
      type: getSelectOrder.rejected.type,
      error: { massage: 'Faild to get SelectOrder' }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Faild to get SelectOrder'
    });
  });
});
