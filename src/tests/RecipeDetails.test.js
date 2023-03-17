import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import { meals } from './mocksTests/mealsRecipesMock';
import { drinks } from './mocksTests/drinksRecipesMock';

describe('Testes para a página RecipesDetails', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se a página renderiza corretamente a rota /meals/52977', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals/52977');
    });

    //! descobrir error de timeout

    //! precisa de 2 mocks de api
    const url1 = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';
    // const url2 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith(url1);
    // expect(fetch).toBeCalledWith(url2);

    const drinkImage = await screen.findByRole('img', { name: /corba/i });
    expect(drinkImage).toBeInTheDocument();

    const nextButton = await screen.findAllByRole('button', { name: /next/i });
    const prevButton = await screen.findAllByRole('button', { name: /prev/i });
    //! Testar click do botão
    expect(nextButton[0]).toBeInTheDocument();
    expect(prevButton[0]).toBeInTheDocument();

    // userEvent.click(nextButton);
  });

  it('Testa se a página renderiza corretamente a rota /drinks/15997', async () => {
    jest.resetAllMocks();
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    }).mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks/15997');
    });

    //! descobrir error de timeout

    //! precisa de 2 mocks de api
    const url1 = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';

    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith(url1);

    const drinkImage = await screen.findByRole('img', { name: /gg/i });
    expect(drinkImage).toBeInTheDocument();

    const nextButton = await screen.findAllByRole('button', { name: /next/i });
    const prevButton = await screen.findAllByRole('button', { name: /prev/i });
    expect(nextButton[0]).toBeInTheDocument();
    expect(prevButton[0]).toBeInTheDocument();
    //! Testar click do botão

    const carouselItem = await screen.findAllByTestId(/-recommendation-title/i);
    expect(carouselItem).toHaveLength(72);

    const carousel = await screen.findAllByTestId(/carsl-t/i);
    expect(carousel[0].scrollLeft).toEqual(0);

    userEvent.click(prevButton[0]);

    expect(carousel[0].scrollLeft).not.toEqual(1);

    // userEvent.click(nextButton[0]);

    // userEvent.click(prevButton);
  });

  // it('Testa se a página renderiza corretamente a rota /drinks', async () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(drinks),
  //   });

  //   const { history } = renderWithRouterAndRedux(<App />);
  //   act(() => {
  //     history.push('/drinks');
  //   });

  //   const recipeList = await screen.findAllByRole('heading', { level: 2 });
  //   expect(recipeList).toHaveLength(12);
  //   expect(recipeList[0].innerHTML).toBe('GG');

  //   const buttonList = await screen.findAllByRole('button');
  //   expect(buttonList).toHaveLength(10);
  //   expect(buttonList[7].innerHTML).toBe('All');
  // });

  // it('Testa buttons de categoria', async () => {
  // jest.resetAllMocks();
  // jest.spyOn(global, 'fetch');
  // global.fetch.mockResolvedValue({
  //   json: jest.fn().mockResolvedValue(meals),
  // });

  //   const initialState = {
  //     category: '',
  //   };

  //   const { history } = renderWithRouterAndRedux(<App />, initialState);
  //   act(() => {
  //     history.push('/meals');
  //   });

  //   await waitFor(() => {
  //     const firstButton = screen.getByRole('button', { name: 'Vegetarian' });
  //     const AllButton = screen.getByRole('button', { name: 'All' });

  //     expect(AllButton).toBeInTheDocument();
  //     expect(firstButton).toBeInTheDocument();
  //     expect(firstButton.innerHTML).toBe('Vegetarian');
  //     act(() => {
  //       userEvent.click(firstButton);
  //     });
  //     userEvent.click(AllButton);
  //   });
  // });
});
