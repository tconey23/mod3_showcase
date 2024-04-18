import './Home.css'
import React, { useState, useEffect } from 'react';
import Carousel from '../Carousel/Carousel'
import { motion } from "framer-motion"
import { getMessage, postFavoriteQuote } from '../../ApiCalls';
import FavoriteSVG from '../../assets/gradient_heart';
import Favorites from '../Favorites/Favorites';
import Error from '../Error/Error';
import Fidgets from '../Fidgets/Fidgets';
import Sandbox from '../Sandbox/Sandbox';


function Home({activities, favorites, favHandler, selectedUser}) {
  const [affirmations, setAffirmations] = useState()
  const [component, renderComponent] = useState([])

  useEffect(() => {
    const rendComps = ['sandbox']
    const selectComponent = () => {
      renderComponent(rendComps)
    }  
    selectComponent()
  }, [])


  useEffect(() => {
    if(selectedUser){
    const fetchData = async () => {
      const response = await getMessage();
      setAffirmations(response);
    };
    fetchData(); 
    const timerId = setInterval(fetchData, 30000);
    return () => clearInterval(timerId)
  }
  }, [selectedUser]);

  const addFavoriteMessage = async () => {
    const userId = 1
    await postFavoriteQuote(userId, affirmations)
    favHandler()
  }

      return (
          <main>
            {selectedUser ? (
              <aside>
                <p id='currentUser'>{selectedUser}</p>
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
                  <p>{affirmations}</p>
                </motion.div>
                <div id='favQuotes'>
                  <Favorites favorites={favorites}/>
                </div>
              </aside>
            ) : (
              <Error errorType={'login_lost'}/>
            )}
            {component.includes('carousel') && 
            <div id='carousel-container'>
              <Carousel activities={activities} />
            </div>}
            {component.includes('fidget') && <Fidgets />}
            {component.includes('sandbox') && <Sandbox />}
          </main>
      );
}


export default Home