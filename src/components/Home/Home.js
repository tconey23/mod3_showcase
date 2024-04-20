import './Home.css'
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from "framer-motion"
import { postFavoriteQuote } from '../../ApiCalls';
import FavoriteSVG from '../../assets/gradient_heart';
import Favorites from '../Favorites/Favorites';
import Error from '../Error/Error';
import { useGlobalProp } from '../../index';


function Home({activities, favorites, favHandler, selectedUser}) {
  const [component, renderComponent] = useState()
  const rendComps = 'carousel'
  let userName, userId
  const { affirmation } = useGlobalProp()

  useEffect(() => {
    const selectComponent = () => {
      renderComponent(rendComps)
    }  
    selectComponent()
  }, [])

  
 if(selectedUser){
  userName = selectedUser.split(',')[1]
  userId = selectedUser.split(',')[0]
}


  const addFavoriteMessage = async () => {
    
    await postFavoriteQuote(userId, affirmation)
    favHandler()
  }

      return (
          <main>
            {selectedUser ? (
              <aside>
                <p id='currentUser'>{userName}</p>
                <motion.div
                  id='messages'
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    repeatDelay: 30
                  }}
                >
                  <FavoriteSVG id="favHeart" onClick={addFavoriteMessage}/>
                  {affirmation && <p>{affirmation}</p>}
                </motion.div>
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