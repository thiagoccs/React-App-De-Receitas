import { useContext, useState } from 'react';
import context from '../context/context';
import { fetchAPI } from '../services/fetchApi';

function SearchBar() {
  const { inputSelected, setInputSelected, title, setFoods } = useContext(context);
  const [searchInput, setSearchInput] = useState('');

  const handleClick = async () => {
    const INGREDIENT = 'Ingredient';
    const NAME = 'Name';
    const FIRST_LETTER = 'First letter';
    const URL = title === 'Meals' ? 'themealdb' : 'thecocktaildb';
    const NAME_SEARCH = await fetchAPI(URL, 'search.php?s', searchInput);

    if (title === 'Meals') {
      switch (inputSelected) {
      case INGREDIENT:
        console.log('ingrediente');
        break;
      case NAME:
        setFoods(NAME_SEARCH.meals);
        break;
      case FIRST_LETTER:
        console.log('Primeira Letra');
        break;
      default:
        return inputSelected;
      }
    } else if (title === 'Drinks') {
      switch (inputSelected) {
      case INGREDIENT:
        console.log('ingrediente Drink');
        break;
      case NAME:
        console.log('nome Drink');
        break;
      case FIRST_LETTER:
        console.log('Primeira Letra Drink');
        break;
      default:
        return inputSelected;
      }
    }
  };

  return (
    <div>
      <label htmlFor="search-input">
        {inputSelected}
        <input
          type="text"
          value={ searchInput }
          onChange={ ({ target }) => setSearchInput(target.value) }
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
