import '../index.css';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgressMeal(props) {
  const { mealsDetailsState,
    isChecked,
    favoriteHeart,
    isDisabled,
    handleOnChange,
    handleFavorite, handleClickShare, id, handleClickFinishRecipe } = props;
  const { strMeal, strMealThumb, strCategory, strInstructions } = mealsDetailsState;
  return (
    <div>
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
      />
      <div>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => handleClickShare('meals', id) }
        >
          <img src={ shareIcon } alt="share" />
        </button>
        <button type="button" onClick={ () => handleFavorite(mealsDetailsState) }>
          {' '}
          <img
            data-testid="favorite-btn"
            src={
              favoriteHeart ? blackHeartIcon : whiteHeartIcon
            }
            alt="favorite"
          />
        </button>
      </div>
      {Array(mealsDetailsState).map((meal) => Object
        .keys(meal).filter((item) => item.includes('strIngredient'))
        .map((key, index) => (
          (
            meal[key] !== null && meal[key] !== ''
               && (
                 <label
                   className={ isChecked[index] ? 'checked' : undefined }
                   data-testid={ `${index}-ingredient-step` }
                   htmlFor="Ingredient"
                   key={ key }
                 >
                   <input
                     checked={ isChecked[index] }
                     onChange={ () => {
                       handleOnChange(index, meal.idMeal, 'meals');
                     } }
                     type="checkbox"
                     name="Ingredient"
                     value={ meal[key] }
                   />
                   { meal[key] }
                 </label>
               )
          ))))}
      <p data-testid="recipe-category">{strCategory}</p>
      <div data-testid="instructions">{strInstructions}</div>
      <button
        style={ { position: 'fixed', bottom: '0px' } }
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ () => handleClickFinishRecipe(mealsDetailsState) }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RecipeInProgressMeal.propTypes = {
  mealsDetailsState: PropTypes.node.isRequired,
  isChecked: PropTypes.arrayOf(Boolean).isRequired,
  favoriteHeart: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  handleClickShare: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  handleClickFinishRecipe: PropTypes.func.isRequired,
};

export default RecipeInProgressMeal;
