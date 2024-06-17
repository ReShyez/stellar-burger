import feedReducer, { FeedsState, getFeeds, initialState } from './feedSlice';
describe('Feeds slice tests', () => {
  const testOrder = {
    _id: '1',
    status: 'done',
    name: 'BurgerBuburger',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:10.000Z',
    number: 123,
    ingredients: ['1', '2', '3']
  };

  test('Тестируем состояния при ожидании отправки запроса заказов', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  test('Тестируем успешное получение заказов', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: {
        orders: [
          { ...testOrder, _id: '1' },
          { ...testOrder, _id: '2', number: 3231 },
          { ...testOrder, _id: '3', number: 5121 }
        ],
        total: 3
      }
    };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: [
        { ...testOrder, _id: '1' },
        { ...testOrder, _id: '2', number: 3231 },
        { ...testOrder, _id: '3', number: 5121 }
      ],
      total: 3,
      loading: false
    });
  });

  test('Тестируем неудачное получение заказов пользователя', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { massage: 'Failed to fetch feeds' }
    };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Failed to fetch feeds'
    });
  });
});
