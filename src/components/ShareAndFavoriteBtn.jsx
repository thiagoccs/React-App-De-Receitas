import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useParams, useHistory } from 'react-router-dom';

function ShareAndFavoriteBtn() {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { id } = useParams();
  const { location: { pathname } } = useHistory();

  function handleClickShare(type, id) {
    setIsLinkCopied(true);
    copy(`http://localhost:3000/${type}/${id}`);
  }
  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ pathname.includes('meals')
          ? () => handleClickShare('meals', id)
          : () => handleClickShare('drinks', id) }
      >
        Share
      </button>
      <br />
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>

      {isLinkCopied && <p>Link copied!</p>}

    </div>
  );
}

export default ShareAndFavoriteBtn;
