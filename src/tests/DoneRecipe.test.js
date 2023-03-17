import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import doneRecipes from './mocksTests/doneRecipes';

describe('Testando Tela de Receita Feita', () => {
  const endPoint = '/done-recipes';

  it('Testando se todos os elementos estão disponíveis', () => {
    jest.spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify(doneRecipes));

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(endPoint);
    });

    expect(screen.getByRole('heading', { name: /Done recipes/i })).toBeInTheDocument();

    doneRecipes.forEach((recipe, index) => {
      const horizontalImage = screen.getByTestId(`${index}-horizontal-image`);
      const horizontalTopText = screen.getByTestId(`${index}-horizontal-top-text`);
      const horizontalName = screen.getByTestId(`${index}-horizontal-name`);
      const horizontalDoneDate = screen.getByTestId(`${index}-horizontal-done-date`);
      const horizontalShareBtn = screen.getByTestId(`${index}-horizontal-share-btn`);

      expect(horizontalImage).toBeInTheDocument();
      expect(horizontalImage).toHaveAttribute('src', recipe.image);
      expect(horizontalImage).toHaveAttribute('alt', recipe.name);

      expect(horizontalTopText).toBeInTheDocument();
      expect(horizontalTopText).toHaveTextContent(recipe.type === 'meal'
        ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot);

      expect(horizontalName).toBeInTheDocument();
      expect(horizontalName).toHaveTextContent(recipe.name);

      expect(horizontalDoneDate).toBeInTheDocument();
      expect(horizontalDoneDate).toHaveTextContent(recipe.doneDate);

      expect(horizontalShareBtn).toBeInTheDocument();
    });
    jest.restoreAllMocks();
  });
  it('testando se clicado na imagem ou no titulo é redirecionado para tela da receita', () => {
    jest.spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify(doneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(endPoint);
    });

    doneRecipes.forEach((recipe, index) => {
      const horizontalImage = screen.getByTestId(`${index}-horizontal-image`);
      const horizontalName = screen.getByTestId(`${index}-horizontal-name`);

      userEvent.click(horizontalImage);
      expect(history.location.pathname).toEqual(`/${recipe.type}s/${recipe.id}`);

      act(() => {
        history.push(endPoint);
      });

      userEvent.click(horizontalName);
      expect(history.location.pathname).toEqual(endPoint);
    });
    jest.restoreAllMocks();
  });
  it('testando se o link é copiado para  clipboard', () => {
    jest.spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify(doneRecipes));

    const writeTextMock = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(endPoint);
    });

    doneRecipes.forEach((recipe, index) => {
      const horizontalShareBtn = screen.getByTestId(`${index}-horizontal-share-btn`);

      userEvent.click(horizontalShareBtn);
      expect(writeTextMock).toHaveBeenCalledWith(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    });
    jest.restoreAllMocks();
  });
  it('Testando quando não há receitas feitas', async () => {
    jest.spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify([]));

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(endPoint);
    });

    expect(await screen.findByText(/Você não tem nenhuma receita/i)).toBeInTheDocument();

    jest.restoreAllMocks();
  });
  it('testando filtro de bebidas', async () => {
    jest.spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify(doneRecipes));

    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(endPoint);
    });

    const filterMealBtn = screen.getByTestId('filter-by-meal-btn');

    userEvent.click(filterMealBtn);

    const drinksRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
      .filter((recipe) => recipe.type === 'bebida');

    localStorage.setItem('doneRecipes', JSON.stringify(drinksRecipes)); // Armazenando a nova lista na localStorage

    drinksRecipes.forEach((recipe, index) => {
      const horizontalTopText = screen.getByTestId(`${index}-horizontal-top-text`);
      expect(horizontalTopText).toHaveTextContent(recipe.alcoholicOrNot);
    });

    jest.restoreAllMocks();
  });
  it('testando 404 ', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/asdsad');
    });

    const notFound = screen.getByText('NotFound');
    // const notFound = screen.getByRole('heading', { level: 2 });
    expect(notFound).toBeInTheDocument();
  });
});
