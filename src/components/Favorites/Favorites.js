import React, {useEffect} from 'react';
import { useGlobalProp } from '../../index';
import { deleteFavoriteQuote } from '../../ApiCalls';

const Favorites = () =>  {

    let favoriteQuotes
    const { favorites, userId, setFavorites } = useGlobalProp()

    const deleteMessage = async (event) => {
        const newFavs = await deleteFavoriteQuote(userId, event.target.parentNode.textContent.replace('X',''))
        setFavorites(newFavs)
    }
    console.log(favorites['favorite quotes'])
    if(favorites['favorite quotes']) {
        favoriteQuotes = favorites['favorite quotes'].map((fav, index) =>  {
            return (
                <div
                    id={`fav${index}`}
                    key={index}>  
                   {fav}
                   <button onClick={(event) => deleteMessage(event)}>X</button>
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