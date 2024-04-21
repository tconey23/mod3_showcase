import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Home from "./components/Home/Home";
import ThoughtBox from "./components/ThoughtBox/ThoughtBox";
import "./App.css";
import { getActivities, getFav, postActiveUser, getMessage } from "./ApiCalls";
import { useGlobalProp } from "./index";
import Fidgets from "./components/Fidgets/Fidgets";
import Sandbox from "./components/Sandbox/Sandbox";
import Carousel from "./components/Carousel/Carousel";
import PropTypes from "prop-types";

function App() {
  const {
    setFavorites,
    userId,
    selectedUser,
    favorites,
    setActivities,
    activities,
    setSelectedUser,
    setAffirmation,
    allThoughts,
    setAllThoughts,
    setLoggedIn,
    loggedIn,
  } = useGlobalProp();

  const logOut = () => {
    setSelectedUser("");
    setLoggedIn();
  };

  const fetchMessage = async () => {
    const message = await getMessage();
    const content = message.choices[0].message.content;
    setAffirmation(content);
  };

  const actUser = async () => {
    await postActiveUser(selectedUser);
  };

  const fetchThoughts = async () => {
    const thoughtResp = await getFav(userId);
    setAllThoughts(thoughtResp);
  };

  const fetchFav = async () => {
    const favResp = await getFav(userId);
    console.log(favResp);
    setFavorites(favResp);
    console.log(allThoughts);
  };

  const favHandler = () => {
    fetchFav();
  };

  useEffect(() => {
    fetchFav();
    actUser();
    fetchMessage();
    fetchThoughts();
  }, [selectedUser]);

  useEffect(() => {
    console.log(allThoughts);
    console.log(loggedIn);
    fetchThoughts();
  }, [loggedIn]);

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
              <Home
                favHandler={favHandler}
                selectedUser={selectedUser}
                favorites={favorites}
                activities={activities}
              />
            }
          >
            <Route path="" element={<Carousel />}></Route>
            <Route path="fidgets" element={<Fidgets />}></Route>
            <Route path="sandbox" element={<Sandbox />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

App.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  favHandler: PropTypes.func.isRequired,
  favorites: PropTypes.array,
  activities: PropTypes.array,
  userId: PropTypes.number,
  allThoughts: PropTypes.array,
  loggedIn: PropTypes.bool,
};
