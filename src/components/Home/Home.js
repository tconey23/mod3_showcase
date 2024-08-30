import "./Home.css";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { postFavoriteQuote, getMessage } from "../../ApiCalls";
import FavoriteSVG from "../../assets/gradient_heart";
import RefreshSVG from "../../assets/refresh";
import Favorites from "../Favorites/Favorites";
import Thoughts from "../Thoughts/Thoughts";
import Error from "../Error/Error";
import { useGlobalProp } from "../../index";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const variants = {
  enter: (direction) => ({
    y: 300,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    y: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

function Home({toggle}) {
  
  const { affirmation, setAffirmation, selectedUser, setFavorites, favorites } = useGlobalProp();
  const [visibleComponent, setVisibleComponent] = useState("favorites");
  const [direction, setDirection] = useState(0);

  const toggleComponent = () => {
    setDirection(direction === 0 ? 1 : 0);
    setVisibleComponent(
      visibleComponent === "thoughts" ? "favorites" : "thoughts",
    );
  };

  const refreshQuote = async () => {
    const message = await getMessage();
    const content = message.choices[0].message.content;
    setAffirmation(content);
  };

  const addFavoriteMessage = async () => {
      const favoriteMessage = {
        id: Date.now(),
        message: affirmation,
      }
      refreshQuote();
      const updatedFavs = await postFavoriteQuote(selectedUser.id, favoriteMessage);
      await setFavorites(updatedFavs['messages']);
      
  };

  return (
    <main>
      {selectedUser && toggle ? (
          <aside>
          <p id="currentUser">
            {selectedUser && selectedUser.name}
            <RefreshSVG onClick={refreshQuote} />
          </p>
          <div id="messages">
            {affirmation && (
              <div id="messageText">
                <FavoriteSVG id="favHeart" onClick={addFavoriteMessage} />
                {affirmation}
              </div>
            )}
          </div>
          <div id="animContainer">
            <AnimatePresence initial={false} custom={direction}>
              {visibleComponent === "favorites" && (
                <motion.div
                  id="favQuotes"
                  key="favorites"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <Favorites />
                </motion.div>
              )}
              {visibleComponent === "thoughts" && (
                <motion.div
                  id="thoughtList"
                  key="thoughts"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <Thoughts />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={toggleComponent}>Toggle Views</button>
        </aside> 
      ) : (
        <Error errorType={"login_lost"} />
      )}
      <Outlet />
    </main>
  );
}

export default Home;

Home.propTypes = {
  selectedUser: PropTypes.string
};
