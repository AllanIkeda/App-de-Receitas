import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { meals } from './mocksTests/mealsRecipesMock';

const drinkUrl = '/drinks/15997/in-progress';

describe('testa componente RecipeInProgress', () => {
  test('testa se tudo está na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals/52977/in-progress');
    });

    const btns = screen.getAllByRole('button');
    expect(btns).toHaveLength(4);
    await screen.findAllByRole('checkbox');

    await waitFor(() => {
      const title = screen.getByTestId('recipe-title');
      const pic = screen.getByTestId('recipe-photo');
      const category = screen.getByTestId('recipe-category');
      const main = screen.getByRole('main');
      expect(title && pic && category && main).toBeInTheDocument();
    });

    act(() => {
      history.push(drinkUrl);
    });
    expect(history.location.pathname).toBe(drinkUrl);

    await waitFor(() => {
      const title = screen.getByTestId('recipe-title');
      const pic = screen.getByTestId('recipe-photo');
      const category = screen.getByTestId('recipe-category');
      const main = screen.getByRole('main');
      expect(title && pic && category && main).toBeInTheDocument();
    });
    const checkbox = await screen.findByLabelText('Galliano2 1/2 shots');
    act(() => {
      userEvent.click(checkbox);
    });
    act(() => {
      history.push('/drinks/15997');
    });
    act(() => {
      history.push(drinkUrl);
    });
    jest.restoreAllMocks();
  });
  it('Testa se a página renderiza corretamente a rota /meals/52977/in-progress', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977/in-progress'] });

    const mainTitle = await screen.findByRole('heading', { name: /corba/i });
    const mainImg = await screen.findByRole('img', { name: /corba/i });
    const btnShare = screen.getByAltText(/share recipe/i);
    const btnFavorite = screen.getByAltText(/favorite recipe/i);
    const igredientList = await screen.findAllByRole('list');
    const igredientItem = await screen.findAllByRole('listitem');
    const firstItem = igredientItem[0];
    const firstcheckBox = await screen.findByRole('checkbox', { name: /Lentils/i });
    const firstlabel = await screen.findAllByTestId('0-ingredient-step');
    const firstItemLabel = firstlabel[0];

    expect(mainTitle).toBeInTheDocument();
    expect(mainImg).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
    expect(igredientList).toHaveLength(12);
    expect(firstItem).toHaveTextContent('Lentils 1 cup');
    expect(firstcheckBox).not.toBeChecked();
    expect(firstItemLabel.className).not.toBe('line-through');

    await waitFor(() => {
      userEvent.click(firstcheckBox);
      expect(firstcheckBox).toBeChecked();
    });
    expect(firstItemLabel.className).toBe('line-through');
    jest.restoreAllMocks();
  });
});
