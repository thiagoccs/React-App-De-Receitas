import React, { useContext } from 'react';
import searchIcon from '../images/searchIcon.svg';
import context from '../context/context';
import SearchBar from './SearchBar';

export default function ProfileIcon() {
  const { showInput, setShowInput } = useContext(context);
  const handleHiddenInput = () => (
    showInput === false ? setShowInput(true) : setShowInput(false));

  return (
    <div>
      <button type="button" onClick={ handleHiddenInput }>
        <img src={ searchIcon } alt="seachIcon" data-testid="search-top-btn" />
      </button>
      {showInput && <SearchBar />}
    </div>
  );
}
