import React, {useEffect} from 'react';
import { useGlobalProp } from '../../index';
import { deleteFavoriteQuote } from '../../ApiCalls';
import './Favorites.css'

const Favorites = () =>  {

    let favoriteQuotes
    const { favorites, userId, setFavorites } = useGlobalProp()

    const deleteMessage = async (event) => {
        const newFavs = await deleteFavoriteQuote(userId, event.target.parentNode.textContent.replace(/🗑/g, ''))
        setFavorites(newFavs)
    }
    if(favorites['favorite quotes']) {
        favoriteQuotes = favorites['favorite quotes'].map((fav, index) =>  {
            return (
                <div
                className='favs-thoughts'
                    id={`fav${index}`}
                    key={index}>  
                   <button onClick={(event) => deleteMessage(event)}>🗑</button>
                   {fav} 
                </div>
                )
        }) 
        favorites['favorite quotes'].forEach((fav) => console.log(fav))

    }

    return (
        <div id='favoriteQuotes'>
            <h4>Your Favorite Messages</h4>
            {favoriteQuotes}
        </div>
    )
}

export default Favorites