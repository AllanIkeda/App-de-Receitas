import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const LOGIN_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const ENTER_BUTTON = 'login-submit-btn';
const VALID_EMAIL = 'tryber@test.com';
const VALID_PASSWORD = '1234567';

describe('Testes referentes a page de Login', () => {
  it('Testa se os inputs \'Login\', \'Password\' e um botão \'Enter\' são', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId(LOGIN_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(ENTER_BUTTON)).toBeInTheDocument();
  });
  it('Testa se é possivel escrever nos inputs e se o botão \'Enter\' redireciona para a tela principal', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const login = screen.getByTestId(LOGIN_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(ENTER_BUTTON);

    expect(button).toBeDisabled();
    userEvent.type(login, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeEnabled();
    userEvent.click(button);

    expect(history.location.pathname).toBe('/meals');
  });
});
