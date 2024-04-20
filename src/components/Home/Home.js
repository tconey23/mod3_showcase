import './Home.css'
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { postFavoriteQuote, getMessage } from '../../ApiCalls';
import FavoriteSVG from '../../assets/gradient_heart';
import RefreshSVG from '../../assets/refresh'
import Favorites from '../Favorites/Favorites';
import Error from '../Error/Error';
import { useGlobalProp } from '../../index';


function Home({activities, favorites, favHandler, selectedUser}) {
  const [component, renderComponent] = useState()
  const rendComps = 'carousel'

  let userName, userId
  const { affirmation, setAffirmation } = useGlobalProp()

  useEffect(() =>  {
    const selectComponent = () =>  {
      renderComponent(rendComps)
    }  
    selectComponent()
  }, [])

  const refreshQuote = async () => {
    const message = await getMessage()
    const content = message.choices[0].message.content
    setAffirmation(content)
  }

  
 if(selectedUser){
  userName = selectedUser.split(',')[1]
  userId = selectedUser.split(',')[0]
}


  const addFavoriteMessage = async () =>  {
    await postFavoriteQuote(userId, affirmation)
    refreshQuote()
    favHandler()
  }

      return (
          <main>
            {selectedUser ? (
              <aside>
                <p id='currentUser'>{userName}<RefreshSVG onClick={refreshQuote}/></p>
                <div
                  id='messages'
                >
                  {affirmation && <div id='messageText'><FavoriteSVG id="favHeart" onClick={addFavoriteMessage}/>{affirmation}</div>}
                </div>
                <div id='favQuotes'>
                  <Favorites favorites={favorites}/>
                </div>
              </aside>
            ) : (
              <Error errorType={'login_lost'}/>
            )}
            <Outlet />
          </main>
      );
}


export default Home