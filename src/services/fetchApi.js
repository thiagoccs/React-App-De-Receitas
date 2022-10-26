export const fetchAPI = async (url, queryType, query) => {
  const response = await fetch(`https://www.${url}.com/api/json/v1/1/${queryType}=${query}`);
  const item = await response.json();
  return item;
};

export const fetchDispatch = (query, title) => {
  const url = title === 'Meals' ? 'themealdb' : 'thecocktaildb';
  return {
    ingredient: () => fetchAPI(url, 'filter.php?i', query),
    name: () => fetchAPI(url, 'search.php?s', query),
    firstLetter: () => fetchAPI(url, 'search.php?f', query),
    category: () => fetchAPI(url, 'filter.php?c', query),
    details: () => fetchAPI(url, 'lookup.php?i', query),
  };
};

export const fetchCategories = async (type) => {
  const response = type === 'Meal'
    ? await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    : await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const categories = await response.json();
  return categories;
};
