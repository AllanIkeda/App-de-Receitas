import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente Header', () => {
  test('Testa se o header está presente nas páginas necessárias', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const altText = 'profile icon';

    act(() => {
      history.push('/meals');
    });
    await screen.findByAltText(altText);

    act(() => {
      history.push('/drinks');
    });
    await screen.findByAltText(altText);

    act(() => {
      history.push('/favorite-recipes');
    });
    await screen.findByAltText(altText);

    act(() => {
      history.push('/done-recipes');
    });
    await screen.findByAltText(altText);

    act(() => {
      history.push('/profile');
    });
    screen.getAllByText('Profile');
  });
  test('testa os botões', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const showSearchBarBtn = screen.getByTestId('search-top-btn');
    act(() => {
      userEvent.click(showSearchBarBtn);
    });
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    act(() => {
      userEvent.click(showSearchBarBtn);
    });
    expect(searchBar).not.toBeInTheDocument();
    const profileBtn = screen.getByTestId('profile-top-btn');
    act(() => {
      userEvent.click(profileBtn);
    });
  });
});
