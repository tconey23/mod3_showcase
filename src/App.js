
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import ThoughtBox from './components/ThoughtBox/ThoughtBox';
import './App.css'
import { getActivities, getFav, postActiveUser } from './ApiCalls';
import { useGlobalProp } from './index';

function App() {

  const { 
    setFavorites, 
    userId, 
    selectedUser, 
    favorites, 
    setActivities, 
    activities, 
    resetFavList,
  } = useGlobalProp()

useEffect(() => {
  const fetchData = async () => {
      const availableActivities = await getActivities();
      setActivities(availableActivities);
  };
  if (!activities) {
      fetchData();
  }

}, []);


  const actUser = async () => {
    await postActiveUser(selectedUser)
  }

  const fetchFav = async () => {
    console.log('get favs', selectedUser)
    const favResp = await getFav(userId)
      setFavorites(favResp)
      console.log(favResp)
  }

const favHandler = () => {
  resetFavList(true)
}

useEffect(() => {
  fetchFav()
  actUser()
}, [selectedUser])

return (

  <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Link to='/home'>Home</Link>
        <Link to='/'>Log Out</Link>
      </header>
      <Routes>
        <Route path='/' element={<ThoughtBox />} />
        <Route path="/home" element={<Home selectedUser={selectedUser} favHandler={favHandler} favorites={favorites} activities={activities} />} />
      </Routes>
    </div>
  </BrowserRouter>
);
}

export default App;



