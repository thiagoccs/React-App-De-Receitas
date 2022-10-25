import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import ProfileIcon from './ProfileIcon';
import context from '../context/context';

export default function Header() {
  const { title, iconSearch } = useContext(context);
  const history = useHistory();

  const handleClickProfile = () => {
    history.push('/profile');
  };

  return (
    <div>
      <button type="button" onClick={ handleClickProfile }>
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </button>
      <h1 data-testid="page-title">{ title }</h1>

      { iconSearch ? <ProfileIcon /> : null }
    </div>
  );
}

Header.propTypes = {
  possuiIconePesquisa: PropTypes.string,
  titulo: PropTypes.string,
}.isRequired;
