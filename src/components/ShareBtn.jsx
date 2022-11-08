import React from 'react';

function FavoriteBtn() {
  return (
    <div>
      <button type="button" data-testid="share-btn">
        Share
      </button>
      <br />
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
    </div>
  );
}

export default FavoriteBtn;
