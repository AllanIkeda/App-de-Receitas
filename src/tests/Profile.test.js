import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { meals } from './mocksTests/mealsRecipesMock';

const LOGIN_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const ENTER_BUTTON = 'login-submit-btn';
const VALID_EMAIL = 'tryber@test.com';
const VALID_PASSWORD = '1234567';

describe('Testa a página de perfil', () => {
  test('Todos os elemento devem estar na página', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const login = screen.getByTestId(LOGIN_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(ENTER_BUTTON);

    expect(button).toBeDisabled();
    act(() => {
      userEvent.type(login, VALID_EMAIL);
      userEvent.type(password, VALID_PASSWORD);
    });
    expect(button).toBeEnabled();
    act(() => {
      userEvent.click(button);
    });

    expect(history.location.pathname).toBe('/meals');

    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    const links = await screen.findAllByRole('button');
    await screen.findByRole('button', { name: /done recipes/i });
    await screen.findByRole('button', { name: /favorite recipes/i });
    await screen.findByRole('button', { name: /logout/i });
    expect(links).toHaveLength(6);
    expect(links).toHaveLength(6);
  });
  test('Testa funcionalidades dos botões', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');
    const doneRecipesBtn = await screen.findByRole('button', { name: /done recipes/i });
    act(() => {
      userEvent.click(doneRecipesBtn);
    });
    expect(history.location.pathname).toBe('/done-recipes');
    act(() => {
      history.push('/profile');
    });
    const favoriteRecipesBtn = await screen.findByRole('button', { name: /favorite recipes/i });
    act(() => {
      userEvent.click(favoriteRecipesBtn);
    });
    expect(history.location.pathname).toBe('/favorite-recipes');
    act(() => {
      history.push('/profile');
    });
    const lougoutBtn = await screen.findByRole('button', { name: /logout/i });
    act(() => {
      userEvent.click(lougoutBtn);
    });
    expect(history.location.pathname).toBe('/');

    jest.restoreAllMocks();
  });
  it('teste se acessa o local storage e renderiza corretamente o email', () => {
    const user = { email: VALID_EMAIL };
    global.localStorage.setItem('user', JSON.stringify(user));

    const parseSpy = jest.spyOn(JSON, 'parse');
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/profile');
    });

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
    expect(email.innerHTML).toBe(VALID_EMAIL);
    expect(parseSpy).not.toHaveBeenCalledWith('{}');

    global.localStorage.removeItem('user');
    parseSpy.mockRestore();
  });
  it('teste se chama JSON.parse com "{}" quando o item não está presente no local storage', () => {
    const getItemMock = jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);
    const parseSpy = jest.spyOn(JSON, 'parse');

    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/profile');
    });

    expect(getItemMock).toHaveBeenCalledWith('user');
    expect(parseSpy).toHaveBeenCalledWith(null);

    getItemMock.mockRestore();
    parseSpy.mockRestore();
  });
});
