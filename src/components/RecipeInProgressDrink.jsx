import '../index.css';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgressDrink(props) {
  const { drinksDetailsState, isChecked,
    favoriteHeart,
    isDisabled,
    handleOnChange,
    handleFavorite, handleClickShare, id, handleClickFinishRecipe } = props;
  const { strDrinkThumb, strDrink, strCategory, strInstructions } = drinksDetailsState;
  return (
    <div>
      <h1 data-testid="recipe-title">{drinksDetailsState.strDrink}</h1>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
      />
      <div>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => handleClickShare('drinks', id) }
        >
          <img src={ shareIcon } alt="share" />
        </button>
        <button type="button" onClick={ () => handleFavorite(drinksDetailsState) }>
          {' '}
          <img
            data-testid="favorite-btn"
            src={ favoriteHeart ? blackHeartIcon : whiteHeartIcon }
            alt="favorite"
          />
        </button>
      </div>
      {Array(drinksDetailsState).map((drink) => Object
        .keys(drink).filter((item) => item.includes('strIngredient'))
        .map((key, index) => (
          (
            drink[key] !== null && drink[key] !== ''
          && (
            <label
              className={ isChecked[index] ? 'checked' : undefined }
              data-testid={ `${index}-ingredient-step` }
              htmlFor="Ingredient"
              key={ key }
            >
              <input
                checked={ isChecked[index] }
                onChange={ () => handleOnChange(
                  index,
                  drink.idDrink,
                  'drinks',
                ) }
                type="checkbox"
                name="Ingredient"
                value={ drink[key] }
              />
              { drink[key] }
            </label>
          )
          )
        )))}
      <p data-testid="recipe-category">
        {strCategory}
      </p>
      <div data-testid="instructions">
        {strInstructions}
      </div>
      <button
        style={ { position: 'fixed', bottom: '0px' } }
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ () => handleClickFinishRecipe(drinksDetailsState) }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RecipeInProgressDrink.propTypes = {
  drinksDetailsState: PropTypes.node.isRequired,
  isChecked: PropTypes.arrayOf(Boolean).isRequired,
  favoriteHeart: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  handleClickShare: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  handleClickFinishRecipe: PropTypes.func.isRequired,
};

export default RecipeInProgressDrink;
