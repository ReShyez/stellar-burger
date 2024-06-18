import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import reducer, {
  setIngridients,
  removeIngredient,
  upIngridient,
  downIngridient,
  IBurgerConstructor,
  initialState
} from './burgerContructor';
import { cleanup } from '@testing-library/react';
import { TIngredient } from '@utils-types';

beforeAll(() => {});
afterAll(() => {
  cleanup();
});
const ingredientes = [
  {
    _id: '1',
    id: '1',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '2',
    id: '2',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  }
];
const ingredient: TIngredient = {
  _id: '1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

describe('Тестирование слайса Construcor и его экшенов', () => {
  //объявим общее состояние которое будем менять
  let ingrState: IBurgerConstructor;
  beforeEach(() => {
    ingrState = {
      bun: null,
      ingredientes: ingredientes
    };
  });
  afterEach(() => {
    ingrState = initialState;
  });

  test('Проверяем добавление ингредиентов в конструктор', () => {
    const action = setIngridients(ingredient);
    const newState = reducer(initialState, action);

    if (ingredient.type === 'bun') {
    } else {
      expect(newState.ingredientes).toHaveLength(1);
      expect(newState.ingredientes[0]).toEqual(
        expect.objectContaining(ingredient)
      );
    }
  });
  test('Проверяем удаление ингредиентов', () => {
    const ingrState: IBurgerConstructor = {
      bun: null,
      ingredientes: ingredientes
    };
    const action = removeIngredient({ id: '1' });
    const newState = reducer(ingrState, action);

    expect(newState.ingredientes).toHaveLength(1);
  });

  test('Проверяем поднятие ингредиента на 1 позицию вверх', () => {
    const action = upIngridient({ id: '2' });
    const newState = reducer(ingrState, action);

    expect(newState.ingredientes[0].id).toBe('2');
    expect(newState.ingredientes[1].id).toBe('1');
  });
  test('Проверяем опускание ингредиента на 1 позицию вниз', () => {
    const action = downIngridient({ id: '1' });
    const newState = reducer(ingrState, action);
    expect(newState.ingredientes[0].id).toBe('2');
    expect(newState.ingredientes[1].id).toBe('1');
  });
});
