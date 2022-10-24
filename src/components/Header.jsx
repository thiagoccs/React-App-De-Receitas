import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import ProfileIcon from './ProfileIcon';

export default function Header() {
  return (
    <div>
      <img
        src={ profileIcon }
        alt="profileIcon"
        data-testid="profile-top-btn"
      />
      <img src={ searchIcon } alt="seachIcon" data-testid="page-title" />
      <ProfileIcon />
    </div>
  );
}
