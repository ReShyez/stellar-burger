import ingredientsReducer, {
  getIngredients,
  initialState
} from './ingredients';
describe('Feeds slice tests', () => {
  const mockIndredient = {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  test('Тестируем состояния при ожидании отправки запроса ингредиентов', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  test('Тестируем успешное получение ингредиентов', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: [
        { ...mockIndredient, _id: '1', type: 'bun' },
        { ...mockIndredient, _id: '2', type: 'main' },
        { ...mockIndredient, _id: '3', type: 'sauce' }
      ]
    };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      data: [
        { ...mockIndredient, _id: '1', type: 'bun' },
        { ...mockIndredient, _id: '2', type: 'main' },
        { ...mockIndredient, _id: '3', type: 'sauce' }
      ],
      buns: [{ ...mockIndredient, _id: '1', type: 'bun' }],
      sauses: [{ ...mockIndredient, _id: '3', type: 'sauce' }],
      mains: [{ ...mockIndredient, _id: '2', type: 'main' }]
    });
  });

  test('Тестируем неудачное получение ингредиентов', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { massage: 'Failed to fetch ingredients' }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Failed to fetch ingredients'
    });
  });
});
