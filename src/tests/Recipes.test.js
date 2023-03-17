import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import { meals } from './mocksTests/mealsRecipesMock';
import { drinks } from './mocksTests/drinksRecipesMock';

describe('Testes para a página Recipes', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se a página renderiza corretamente a rota /meals', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const url1 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const url2 = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledTimes(2);
    expect(fetch).toBeCalledWith(url1);
    expect(fetch).toBeCalledWith(url2);

    const recipeList = await screen.findAllByRole('heading', { level: 2 });
    expect(recipeList).toHaveLength(12);
    expect(recipeList[0].innerHTML).toBe('Corba');

    const buttonList = await screen.findAllByRole('button');
    expect(buttonList).toHaveLength(10);
    expect(buttonList[7].innerHTML).toBe('All');
  });

  it('Testa se a página renderiza corretamente a rota /drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    const recipeList = await screen.findAllByRole('heading', { level: 2 });
    expect(recipeList).toHaveLength(12);
    expect(recipeList[0].innerHTML).toBe('GG');

    const buttonList = await screen.findAllByRole('button');
    expect(buttonList).toHaveLength(10);
    expect(buttonList[7].innerHTML).toBe('All');
  });

  it('Testa buttons de categoria', async () => {
    // jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const initialState = {
      category: '',
    };

    const { history } = renderWithRouterAndRedux(<App />, initialState);
    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      const firstButton = screen.getByRole('button', { name: 'Vegetarian' });
      const AllButton = screen.getByRole('button', { name: 'All' });

      expect(AllButton).toBeInTheDocument();
      expect(firstButton).toBeInTheDocument();
      expect(firstButton.innerHTML).toBe('Vegetarian');
      act(() => {
        userEvent.click(firstButton);
      });
      userEvent.click(AllButton);
    });
  });
  it('testa se redireciona para a pagina de detalhes ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const getElement = await screen.findByTestId('0-card-img');
    userEvent.click(getElement);
  });
});
