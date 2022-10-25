import { Link } from 'react-router-dom';
import '../index.css';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="fix-footer">
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="mealIconIcon"
          data-testid="meals-bottom-btn"
        />
      </Link>
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
