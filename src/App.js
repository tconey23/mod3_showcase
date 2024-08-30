import React, { useEffect, useState } from "react";
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

  const [toggleAside, setToggleAside] = useState(false)

  useEffect(() => {
    window.innerWidth > 430 ? setToggleAside(true) : setToggleAside(false)
  }, [])
  
  const {
    setFavorites,
    selectedUser,
    setActivities,
    activities,
    setSelectedUser,
    setAffirmation,
    setLoggedIn,
    setAllThoughts,
    favorites
  } = useGlobalProp();

  const logOut = () => {
    setSelectedUser("");
    setLoggedIn();
    postActiveUser('none')
  };

  const fetchMessage = async () => {
    const message = await getMessage();
    let content
    if(message){content = message.choices[0].message.content}
    setAffirmation(content);
  };

  const actUser = async () => {
    await postActiveUser(selectedUser.name);
  };

  useEffect(() => {
    if(selectedUser){ 
      fetchMessage()
      actUser()
      setFavorites(selectedUser['messages'])
      setAllThoughts(selectedUser['thoughts'])
      setLoggedIn(true)
      console.log(favorites)
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

  const expandAside = () => {
    setToggleAside(prev => (
      prev === true ? false : true
    ))
  }

  useEffect(() => {
    console.log(toggleAside)
  }, [toggleAside])

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Calming Corner</h1>
          <div className="link-wrapper">
            <i className="fi fi-br-menu-dots-vertical" onClick={()=>expandAside()}></i>
            <NavLink id="headerLinks" to="/home">
              Home
            </NavLink>
            <NavLink id="headerLinks" to="/" onClick={logOut}>
              Log Out
            </NavLink>
          </div>
        </header>
        <Routes>
           <Route path="/" element={<ThoughtBox />} />
          <Route
            path="/home"
            element={
              <Home toggle={toggleAside}/>
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
  selectedUser: PropTypes.string,
  favorites: PropTypes.array,
  activities: PropTypes.array,
  userId: PropTypes.number,
  allThoughts: PropTypes.array,
  loggedIn: PropTypes.bool,
};
