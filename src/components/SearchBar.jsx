import { useContext, useState } from 'react';
import context from '../context/context';
import { fetchAPI } from '../services/fetchApi';

function SearchBar() {
  const INGREDIENT = 'Ingredient';
  const NAME = 'Name';
  const FIRST_LETTER = 'First letter';

  const {
    title,
    setFoods,
    setIngredientesFood,
    setFirstLetterFoods,
    setDrinks,
    setFirstLetterDrinks,
    setIngredientesDrink,
  } = useContext(context);
  const [searchInput, setSearchInput] = useState('');
  const [inputSelected, setInputSelected] = useState('Ingredient');

  const handleClick = async () => {
    const url = title === 'Meals' ? 'themealdb' : 'thecocktaildb';

    if (title === 'Meals') {
      if (inputSelected === NAME) {
        const { meals: foodName } = await fetchAPI(url, 'search.php?s', searchInput);
        setFoods(foodName);
      } else if (inputSelected === INGREDIENT) {
        const { meals: ingredientFood } = await
        fetchAPI(url, 'filter.php?i', searchInput);
        setIngredientesFood(ingredientFood);
      } else if (inputSelected === FIRST_LETTER) {
        const { meals: foodFirstLetter } = await
        fetchAPI(url, 'search.php?f', searchInput);
        setFirstLetterFoods(foodFirstLetter);
      }
    }
    if (title === 'Drinks') {
      if (inputSelected === NAME) {
        const { meals: drinkName } = await fetchAPI(url, 'search.php?s', searchInput);
        setDrinks(drinkName);
      } else if (inputSelected === INGREDIENT) {
        const { meals: ingredientDrink } = await
        fetchAPI(url, 'filter.php?i', searchInput);
        setIngredientesDrink(ingredientDrink);
      } else if (inputSelected === FIRST_LETTER) {
        const { meals: drinkFirstLetter } = await
        fetchAPI(url, 'search.php?f', searchInput);
        setFirstLetterDrinks(drinkFirstLetter);
      }
    }
  };

  const handleChangeInput = ({ target }) => {
    if (inputSelected === FIRST_LETTER && searchInput.length >= 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setSearchInput(target.value);
  };

  return (
    <div>
      <label htmlFor="search-input">
        {inputSelected}
        <input
          type="text"
          value={ searchInput }
          onChange={ handleChangeInput }
          name="search-input"
          data-testid="search-input"
        />
      </label>
      <div>
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="Ingredient"
          checked={ inputSelected === 'Ingredient' }
          onChange={ ({ target }) => setInputSelected(target.value) }
          name="search-input"
        />
        {' '}
        Ingredient
        <input
          data-testid="name-search-radio"
          type="radio"
          value="Name"
          checked={ inputSelected === 'Name' }
          onChange={ ({ target }) => setInputSelected(target.value) }
          name="search-input"
        />
        {' '}
        Name
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="First letter"
          checked={ inputSelected === 'First letter' }
          onChange={ ({ target }) => setInputSelected(target.value) }
          name="search-input"
        />
        {' '}
        First letter
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Procurar

      </button>
    </div>
  );
}

export default SearchBar;
