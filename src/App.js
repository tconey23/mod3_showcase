import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Home from "./components/Home/Home";
import ThoughtBox from "./components/ThoughtBox/ThoughtBox";
import Error from "./components/Error/Error";
import "./App.css";
import { getActivities, postActiveUser, getMessage } from "./ApiCalls";
import { useGlobalProp } from "./index";
import Fidgets from "./components/Fidgets/Fidgets";
import Sandbox from "./components/Sandbox/Sandbox";
import Carousel from "./components/Carousel/Carousel";
import PropTypes from "prop-types";

function App() {
  const {
    setFavorites,
    selectedUser,
    favorites,
    setActivities,
    activities,
    setSelectedUser,
    setAffirmation,
    setLoggedIn,
    loggedIn,    
    thisThought,
    setThought,
    allThoughts,
    setAllThoughts,
  } = useGlobalProp();

  const logOut = () => {
    setSelectedUser("");
    setLoggedIn();
    postActiveUser('none')
  };

  const fetchMessage = async () => {
    const message = await getMessage();
    const content = message.choices[0].message.content;
    setAffirmation(content);
  };

  const actUser = async () => {
    await postActiveUser(selectedUser.name);
  };

  useEffect(() => {
    if(selectedUser){ 
      console.log(selectedUser)
      fetchMessage()
      actUser()
      setFavorites(selectedUser['messages'])
      setAllThoughts(selectedUser['thoughts'])
      setLoggedIn(true)
      console.log('favorites', favorites)
      console.log(loggedIn)
    }
  }, [selectedUser]);

  useEffect(() => {
    const fetchData = async () => {
      const availableActivities = await getActivities();
      setActivities(availableActivities);
    };
    if (!activities) {
      fetchData();
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavLink id="headerLinks" to="/home">
            Home
          </NavLink>
          <NavLink id="headerLinks" to="/" onClick={logOut}>
            Log Out
          </NavLink>
        </header>
        <Routes>
          <Route path="/" element={<ThoughtBox />} />
          <Route
            path="/home"
            element={
              <Home />
            }
          >
            <Route path="" element={<Carousel />}></Route>
            <Route path="fidgets" element={<Fidgets />}></Route>
            <Route path="sandbox" element={<Sandbox />}></Route>
          </Route>
          <Route path='*' element={<Error errorType={`bad_path`} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

App.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  favorites: PropTypes.array,
  activities: PropTypes.array,
  userId: PropTypes.number,
  allThoughts: PropTypes.array,
  loggedIn: PropTypes.bool,
};
