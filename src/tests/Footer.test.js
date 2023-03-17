import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const LOGIN_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const ENTER_BUTTON = 'login-submit-btn';
const VALID_EMAIL = 'tryber@test.com';
const VALID_PASSWORD = '1234567';
const DRINK_BUTTON = 'drinks-bottom-btn';
const MEALS_BURRON = 'meals-bottom-btn';

describe('Testes referentes ao componente \'Footer\'', () => {
  it('Testa se os botões de redirecionameto existem', () => {
    renderWithRouterAndRedux(<App />);
    const login = screen.getByTestId(LOGIN_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(ENTER_BUTTON);

    userEvent.type(login, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);

    const drink = screen.getByTestId(DRINK_BUTTON);
    const meals = screen.getByTestId(MEALS_BURRON);
    expect(drink).toBeInTheDocument();
    expect(meals).toBeInTheDocument();
  });
  it('Testa se os botões funcionam', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const login = screen.getByTestId(LOGIN_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(ENTER_BUTTON);

    userEvent.type(login, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);

    // waitFor(() => {
    const drink = screen.getByTestId(DRINK_BUTTON);
    const meals = screen.getByTestId(MEALS_BURRON);
    userEvent.click(drink);
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(meals);
    expect(history.location.pathname).toBe('/meals');
    // });
  });
});
