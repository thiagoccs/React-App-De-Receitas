import { useContext, useState } from 'react';
import context from '../context/context';
import { fetchDispatch } from '../services/fetchApi';

function SearchBar() {
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
    const INGREDIENT = 'Ingredient';
    const NAME = 'Name';
    const FIRST_LETTER = 'First letter';

    if (title === 'Meals') {
      switch (inputSelected) {
      case NAME:
        setFoods(await fetchDispatch(searchInput, title).name());
        break;
      case INGREDIENT:
        setIngredientesFood(await fetchDispatch(searchInput, title).ingredient());
        break;
      case FIRST_LETTER:
        setFirstLetterFoods(await fetchDispatch(searchInput, title).firstLetter());
        break;
      default:
        break;
      }
    }
    if (title === 'Drinks') {
      switch (inputSelected) {
      case NAME:
        setDrinks(await fetchDispatch(searchInput, title).name());
        break;
      case INGREDIENT:
        setIngredientesDrink(await fetchDispatch(searchInput, title).ingredient());
        break;
      case FIRST_LETTER:
        setFirstLetterDrinks(await fetchDispatch(searchInput, title).firstLetter());
        break;
      default:
        break;
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
