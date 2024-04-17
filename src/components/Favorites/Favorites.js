import React, { useState, useEffect } from 'react';

const Favorites = ({favorites, selectedUser}) => {

    let favoriteQuotes

    if(favorites) {
        favoriteQuotes = favorites['favorite quotes'].map((fav, index) => {
            return (
                <div
                    id={`fav${index}`}
                    key={index}> 
                   "{fav}"
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