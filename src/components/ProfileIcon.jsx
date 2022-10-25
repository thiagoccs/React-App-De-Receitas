import React from 'react';
import searchIcon from '../images/searchIcon.svg';

export default function ProfileIcon() {
  return (
    <div>
      <button type="button">
        <img src={ searchIcon } alt="seachIcon" data-testid="search-top-btn" />
      </button>
    </div>
  );
}
