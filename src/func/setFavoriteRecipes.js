const setFavoriteRecipes = (snack, id, pathname) => {
  const storage = JSON.parse(localStorage
    .getItem('favoriteRecipes'));
  const isNull = storage === null ? [] : storage;
  const food = isNull
    .map(({ id: identity }) => identity === id) ? isNull
      .filter(({ id: identity }) => identity !== id) : isNull
      .filter(({ id: identity }) => identity === id);
  if (!isNull.some((value) => value.id === id)) {
    const item = [...food, {
      id,
      type: pathname.includes('meals') ? 'meal' : 'drink',
      category: snack.strCategory,
      alcoholicOrNot: pathname.includes('meals') ? '' : snack.strAlcoholic,
      name: pathname.includes('meals') ? snack.strMeal : snack.strDrink,
      image: pathname.includes('meals') ? snack.strMealThumb : snack.strDrinkThumb,
      nationality: pathname.includes('meals') ? snack.strArea : '',
    }];
    localStorage
      .setItem('favoriteRecipes', JSON
        .stringify(item));
  } else {
    const item = food.filter((e) => e.id !== id);
    localStorage
      .setItem('favoriteRecipes', JSON
        .stringify(item));
  }
};

export default setFavoriteRecipes;
