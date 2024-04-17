import './Home.css'
import React, { useState, useEffect } from 'react';
import Carousel from '../Carousel/Carousel'
import { motion, animate } from "framer-motion"
import { getMessage, postFavoriteQuote } from '../../ApiCalls';
import FavoriteSVG from '../../assets/gradient_heart';
import Favorites from '../Favorites/Favorites';


function Home({activities, favorites, favHandler, selectedUser}) {
  const [affirmations, setAffirmations] = useState()
  const [fetchState, setFetchState] = useState(true)

  console.log(selectedUser)

  useEffect(() => {
    if(fetchState){
    const fetchData = async () => {
      const response = await getMessage();
      setAffirmations(response);
    };
    fetchData(); 
    const timerId = setInterval(fetchData, 30000);
    return () => clearInterval(timerId)
  }
  }, [fetchState]);

  const toggleApiCalls = () => {
    setFetchState(true)
  }

  const addFavoriteMessage = async () => {
    const userId = 1
    await postFavoriteQuote(userId, affirmations)
    favHandler()
  }

  useEffect(() => {
    toggleApiCalls()
  }, [])

      return (
        <main>
          <aside>
            <p id='currentUser'>{selectedUser}</p>
            <motion.div id='messages'
                        initial={{ opacity: 1 }}
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity, 
                          repeatType: "reverse", 
                          repeatDelay: 30
                      }}>
                        <FavoriteSVG id="favHeart" onClick={addFavoriteMessage}/>
                        {affirmations}
          </motion.div>
          <div id='favQuotes'>
              <Favorites favorites={favorites}/>
          </div>
          </aside>
            <div id='carousel-container'>
                <Carousel activities={activities} />
            </div>
        </main>
      );
}


export default Home