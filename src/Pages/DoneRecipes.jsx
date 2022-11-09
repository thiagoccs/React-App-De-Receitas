import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import context from '../context/context';

export default function DoneRecipes() {
  const { setTitle, setIconSearch } = useContext(context);

  const [doneRecipes, setDoneRecipes] = useState([]);
  const [typeRecipeSelected, setTypeRecipeSelected] = useState('');
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (pathname === '/done-recipes') {
      setTitle('Done Recipes');
      setIconSearch(false);
    }
  }, [pathname, setIconSearch, setTitle]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(getLocalStorage);
  }, []);

  function handleClick({ target: { name } }) {
    switch (name) {
    case 'meal':
      return setTypeRecipeSelected(name);
    default:
      return setTypeRecipeSelected(name);
    }
  }

  function handleClickDirection(nameType, id) {
    const path = `/${nameType}/${id}`;
    history.push(path);
  }

  function handleClickShare(type, id) {
    setIsLinkCopied(true);
    copy(`http://localhost:3000/${type}/${id}`);
  }

  return (
    <div>
      <Header />
      <button
        type="button"
        name=""
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
      >
        All
      </button>
      <button
        type="button"
        name="meal"
        data-testid="filter-by-meal-btn"
        onClick={ handleClick }
      >
        Meals
      </button>
      <button
        type="button"
        name="drink"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
      >
        Drinks
      </button>

      { doneRecipes
      && doneRecipes.filter((recipe) => recipe.type.includes(typeRecipeSelected))
        .map((recipe, index) => (
          <div key={ recipe.id }>
            <button
              type="button"
              onClick={ recipe.type === 'meal'
                ? () => handleClickDirection('meals', recipe.idMeal)
                : () => handleClickDirection('drinks', recipe.idDrink) }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                width="150px"
              />
              <h2 data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </h2>
            </button>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </h3>
            <h4 data-testid={ `${index}-horizontal-done-date` }>
              Recipe done:
              {recipe.doneDate}
            </h4>
            <div>
              Tags:
              {recipe.type === 'meal' ? (
                recipe.tags.map((tagName) => (
                  <p
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                    key={ tagName }
                  >
                    {tagName}
                  </p>
                ))
              ) : (<p> none </p>)}
            </div>

            <button
              type="button"
              onClick={ recipe.type === 'meal'
                ? () => handleClickShare('meals', recipe.id)
                : () => handleClickShare('drinks', recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="shareRecipe"
              />
            </button>
          </div>
        ))}

      {isLinkCopied && <p>Link copied!</p>}
    </div>
  );
}
