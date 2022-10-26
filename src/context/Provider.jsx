import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { fetchAPI } from '../services/fetchApi';
import context from './context';

function Provider({ children }) {
  const [categoriasFood, setcategoriasFood] = useState([]);
  const [nacionalidadeFood, setNacionalidadeFood] = useState([]);
  const [foods, setFoods] = useState([]);
  const [ingredientesFood, setIngredientesFood] = useState([]);
  const [categoriasDrink, setcategoriasDrink] = useState([]);
  const [drink, setDrinks] = useState([]);
  const [ingredientesDrink, setIngredientesDrink] = useState([]);
  const [inputSelected, setInputSelected] = useState('Ingredient');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [title, setTitle] = useState('');
  const [iconSearch, setIconSearch] = useState(true);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      const fetchCategories = await fetchAPI('themealdb', 'list.php?c', 'list');
      const fetchNacionalidade = await fetchAPI('themealdb', 'list.php?a', 'list');
      const fetchFoods = await fetchAPI('themealdb', 'search.php?s', '');
      const fetchIngredientes = await fetchAPI('themealdb', 'list.php?i', 'list');

      setcategoriasFood(fetchCategories.meals);
      setNacionalidadeFood(fetchNacionalidade.meals);
      setFoods(fetchFoods.meals);
      setIngredientesFood(fetchIngredientes.meals);
    };
    const fetchDrink = async () => {
      const fetchCategories = await fetchAPI('thecocktaildb', 'list.php?c', 'list');
      const fetchDrinks = await fetchAPI('thecocktaildb', 'search.php?s', '');
      const fetchIngredientes = await fetchAPI('thecocktaildb', 'list.php?i', 'list');

      setcategoriasDrink(fetchCategories.drinks);
      setDrinks(fetchDrinks.drinks);
      setIngredientesDrink(fetchIngredientes.drinks);
    };

    fetchMeal();
    fetchDrink();
  }, []);

  const contextValue = useMemo(
    () => ({

      categoriasFood,
      nacionalidadeFood,
      foods,
      ingredientesFood,
      categoriasDrink,
      drink,
      ingredientesDrink,
      user,
      title,
      iconSearch,
      inputSelected,
      setFoods,
      setUser,
      setTitle,
      setIconSearch,
      showInput,
      setShowInput,
      setInputSelected,
    }),
    [categoriasDrink,
      categoriasFood,
      drink,
      foods,
      ingredientesDrink,
      ingredientesFood,
      nacionalidadeFood,
      user,
      title,
      iconSearch,
      inputSelected,
      setUser,
      showInput,
      setShowInput,
      setInputSelected],
  );
  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
