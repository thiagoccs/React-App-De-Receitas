import '../index.css';

function RecipeInProgressDrink(props) {
  return (
    [props.drinksDetailsState].map((drink) => Object
      .keys(drink).filter((item) => item.includes('strIngredient'))
      .map((key, index) => (
        (
          drink[key] !== null && drink[key] !== ''
          && (
            <label
              className={ props.isChecked[index] ? 'checked' : undefined }
              data-testid={ `${index}-ingredient-step` }
              htmlFor="Ingredient"
              key={ key }
            >
              <input
                checked={ props.isChecked[index] }
                onChange={ () => props.handleOnChange(
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
      )))
  );
}
export default RecipeInProgressDrink;
