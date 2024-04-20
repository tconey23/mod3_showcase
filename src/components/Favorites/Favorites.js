import React from 'react';
import { useGlobalProp } from '../../index';

const Favorites = () => {

    let favoriteQuotes
    const { favorites } = useGlobalProp()

    if(favorites.id) {
        favoriteQuotes = favorites['favorite quotes'].map((fav, index) => {
            return (
                <div
                    id={`fav${index}`}
                    key={index}> 
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