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
    console.log(favorites['favorite quotes'])
    if(favorites['favorite quotes']) {
        favoriteQuotes = favorites['favorite quotes'].map((fav, index) =>  {
            return (
                <div
                    id={`fav${index}`}
                    key={index}>  
                   <button onClick={(event) => deleteMessage(event)}>🗑</button>
                   {fav} 
                </div>
                )
        })
    }

    return (
        <div id='favoriteQuotes'>
            {favoriteQuotes}
        </div>
    )
}

export default Favorites