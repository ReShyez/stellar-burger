const BASE_URL = 'https://norma.nomoreparties.space/api';
const BUN_FIRST = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
const BUN_SECOND = `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`;
const INGREDIENT = `[data-cy=${'643d69a5c3f7b9001cfa0948'}]`;

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.intercept('POST', `${BASE_URL}/auth/login`, {
    fixture: 'user.json'
  });
  cy.intercept('GET', `${BASE_URL}/auth/user`, {
    fixture: 'user.json'
  });
  cy.intercept('POST', `${BASE_URL}/orders`, {
    fixture: 'orderResonce.json'
  });
  cy.visit('/');
  cy.get('#modals').as('myModal');
  cy.viewport(1200, 800);
});

describe('Тест добавления ингредиентов', () => {
  it('Увеличивается счетчик ингредиента ', () => {
    cy.get(INGREDIENT).children('button').click();
  });
  it('Добавление ингредиента', () => {
    cy.get(INGREDIENT).children('button').click();
  });
  it('Добавление булки', () => {
    cy.get(BUN_FIRST).children('button').click();
  });
  it('Замена булки', () => {
    cy.get(BUN_FIRST).children('button').click();
    cy.get(BUN_SECOND).children('button').click();
  });
});

describe('Тест модальных окон', () => {
  it('Открытие модального окна', () => {
    cy.get('@myModal').should('be.empty');
    cy.get(INGREDIENT).children('a').click();
    cy.get('@myModal').should('not.be.empty');
    cy.url().should('include', '643d69a5c3f7b9001cfa0948');
  });
  it('Закрытие модального окна', () => {
    cy.get('@myModal').should('be.empty');
    cy.get(INGREDIENT).children('a').click();
    cy.get('@myModal').should('not.be.empty');
    cy.get(`[data-cy='modal']`).click({ force: true });
    cy.get('@myModal').should('be.empty');
  });
});

describe('Тест оформления заказа', () => {
  beforeEach(() => {
    window.localStorage.setItem('sessionToken', 'refreshTest');
    cy.setCookie('authToken', 'accessTest');
    cy.getAllLocalStorage().should('not.be.empty');
    cy.getCookie('authToken').should('exist');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearAllCookies();
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });

  it('Отправка заказа', () => {
    cy.get(BUN_FIRST).children('button').click();
    cy.get(INGREDIENT).children('button').click();
    cy.get(`[data-cy='order-button']`).click();
    cy.intercept('POST', `${BASE_URL}/orders`, {
      fixture: 'orderResonce.json'
    });
    cy.get('@myModal').find('h2').contains('42943');
    cy.get(`[data-cy='modal']`).click({ force: true });
    cy.get('@myModal').should('be.empty');
  });
});
