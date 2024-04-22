import React, { useEffect, useState } from "react";
import { useGlobalProp } from "../../index";
import { deleteFavoriteQuote } from "../../ApiCalls";
import "./Favorites.css";
import PropTypes from "prop-types";

const Favorites = () => {
  const { favorites, setFavorites, selectedUser } = useGlobalProp();
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);

  useEffect(() => {
    if (favorites) {
      const updatedFavoriteQuotes = favorites.map((fav, index) => (
        <div className="favs-thoughts" id={fav.id} key={fav.id}>
          <button onClick={(event) => deleteMessage(event)}>🗑</button>
          {fav.message}
        </div>
      ));
      setFavoriteQuotes(updatedFavoriteQuotes);
    }
  }, [favorites]);

  const deleteMessage = async (event) => {

    const msgId = parseInt(event.target.parentNode.id)
    const userId = selectedUser.id
    const updatedFavorites = await deleteFavoriteQuote(msgId, userId)
    setFavorites(updatedFavorites['messages'])
  };

  return (
    <div id="favoriteQuotes">
      <h4>Your Favorite Messages</h4>
      {favoriteQuotes}
    </div>
  );
};

export default Favorites;

Favorites.propTypes = {
  favorites: PropTypes.array,
  activities: PropTypes.array,
  userId: PropTypes.number,
};
