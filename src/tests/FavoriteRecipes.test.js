import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { favoriteRecipes, updatedFavoriteRecipes } from './mocksTests/favoriteRecipes';

describe('Testando page Favrite Recipes', () => {
  const endPoint = '/favorite-recipes';
  const txtBtnAll = 'filter-by-all-btn';
  const txtBtnMeal = 'filter-by-meal-btn';
  const txtBtnDrink = 'filter-by-drink-btn';

  it('Testando se os elementos são renderizados', () => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const parseSpy = jest.spyOn(JSON, 'parse');
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(endPoint);
    });

    expect(parseSpy).toHaveBeenCalledWith(localStorage.getItem('favoriteRecipes'));

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();

    expect(screen.getByTestId(txtBtnAll)).toBeInTheDocument();
    expect(screen.getByTestId(txtBtnMeal)).toBeInTheDocument();
    expect(screen.getByTestId(txtBtnDrink)).toBeInTheDocument();

    const titleCard = screen.getAllByRole('heading', { level: 3 });
    expect(titleCard).toHaveLength(3);
    expect(titleCard[0].innerHTML).toBe('Burek');

    const titleCardType = screen.getAllByRole('heading', { level: 2 });
    expect(titleCardType).toHaveLength(3);
    expect(titleCardType[0].innerHTML).toBe('Croatian - Side');

    const imagesCard = screen.getAllByRole('img');
    expect(imagesCard).toHaveLength(9);
    const thumbCard = screen.getAllByTestId(/-horizontal-image/i);

    expect(thumbCard[0].src).toBe('https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg');

    parseSpy.mockRestore();
  });
  it('testando funcionalidades dos botões', () => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const parseSpy = jest.spyOn(JSON, 'parse');
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(endPoint);
    });

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(3);

    userEvent.click(screen.getByTestId(txtBtnMeal));

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(2);

    userEvent.click(screen.getByTestId(txtBtnDrink));

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(1);

    userEvent.click(screen.getByTestId(txtBtnAll));

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(3);

    const btnFavorite1 = screen.getByTestId('2-horizontal-favorite-btn');
    const btnFavorite2 = screen.getByTestId('1-horizontal-favorite-btn');
    const btnFavorite3 = screen.getByTestId('0-horizontal-favorite-btn');
    expect(btnFavorite1).toBeInTheDocument();

    userEvent.click(btnFavorite1);

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(2);

    expect(localStorage.getItem('favoriteRecipes')).toBe(JSON.stringify(updatedFavoriteRecipes));

    userEvent.click(btnFavorite2);
    userEvent.click(btnFavorite3);

    expect(localStorage.getItem('favoriteRecipes')).toBe(JSON.stringify([]));

    parseSpy.mockRestore();
  });
  it('Testand Redirect', () => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const parseSpy = jest.spyOn(JSON, 'parse');
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(endPoint);
    });

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(3);

    userEvent.click(screen.getByTestId(txtBtnMeal));

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(2);

    userEvent.click(screen.getByTestId(txtBtnDrink));

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(1);

    userEvent.click(screen.getByTestId(txtBtnAll));

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(3);

    const redirect = screen.getAllByTestId(/-horizontal-image/i)[0];

    userEvent.click(redirect);

    expect(history.location.pathname).toBe('/meals/53060');

    parseSpy.mockRestore();
  });
  it('teste se chama JSON.parse com "{}" quando o item não está presente no local storage', () => {
    const getItemMock = jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);
    const parseSpy = jest.spyOn(JSON, 'parse');

    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(endPoint);
    });

    expect(getItemMock).toHaveBeenCalledWith('favoriteRecipes');
    expect(parseSpy).toHaveBeenCalledWith(null);

    getItemMock.mockRestore();
    parseSpy.mockRestore();
  });
  it('Testand Redirect', () => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const parseSpy = jest.spyOn(JSON, 'parse');
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(endPoint);
    });

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(3);

    userEvent.click(screen.getByTestId(txtBtnMeal));

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(2);

    userEvent.click(screen.getByTestId(txtBtnDrink));

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(1);

    userEvent.click(screen.getByTestId(txtBtnAll));

    expect(screen.getAllByTestId(/-horizontal-image/i)).toHaveLength(3);

    const redirect = screen.getAllByTestId(/-horizontal-name/i)[0];

    userEvent.click(redirect);

    expect(history.location.pathname).toBe('/meals/53060');

    parseSpy.mockRestore();
  });
});
