import { useContext } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import ProfileIcon from './ProfileIcon';
import context from '../context/context';

export default function Header() {
  const { title, iconSearch } = useContext(context);
  return (
    <div>
      <img
        src={ profileIcon }
        alt="profileIcon"
        data-testid="profile-top-btn"
      />
      <h1 data-testid="page-title">{ title }</h1>

      { iconSearch ? <ProfileIcon /> : null }
    </div>
  );
}

Header.propTypes = {
  possuiIconePesquisa: PropTypes.string,
  titulo: PropTypes.string,
}.isRequired;
