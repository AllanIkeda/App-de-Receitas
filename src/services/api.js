export const recipeAPI = async (URL) => {
  try {
    const response = await fetch(URL);
    const result = await response.json();
    // if (result.meals === null || result.drinks === null) {
    //   throw new Error('Nenhum resultado encontrado');
    // }
    return result;
  } catch (e) {
    throw new Error('Sem Resultados');
  }
};

export const drinksCategoriesApi = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};

export const mealsCategoriesApi = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};

export const detailsRecipesApi = async (URL) => {
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};
