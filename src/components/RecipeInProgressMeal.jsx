import '../index.css';

function RecipeInProgressMeal(props) {
  return (
    [props.mealsDetailsState].map((meal) => Object
      .keys(meal).filter((item) => item.includes('strIngredient'))
      .map((key, index) => (
        (
          meal[key] !== null && meal[key] !== ''
          && (
            <label
              className={ props.isChecked[index] ? 'checked' : undefined }
              data-testid={ `${index}-ingredient-step` }
              htmlFor="Ingredient"
              key={ key }
            >
              <input
                checked={ props.isChecked[index] }
                onChange={ () => {
                  props.handleOnChange(index, meal.idMeal, 'meals');
                } }
                type="checkbox"
                name="Ingredient"
                value={ meal[key] }
              />
              { meal[key] }
            </label>
          )
        ))))
  );
}
export default RecipeInProgressMeal;
