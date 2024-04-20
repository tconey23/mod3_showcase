
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import ThoughtBox from './components/ThoughtBox/ThoughtBox';
import './App.css'
import { getActivities, getFav, postActiveUser, getMessage } from './ApiCalls';
import { useGlobalProp } from './index';
import Fidgets from './components/Fidgets/Fidgets';
import Sandbox from './components/Sandbox/Sandbox';
import Carousel from './components/Carousel/Carousel';

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
  } = useGlobalProp()

const logOut = () =>  {
  setSelectedUser('')
}

const fetchMessage = async () =>  {
  const message = await getMessage()
  const content = message.choices[0].message.content
    setAffirmation(content)
}

const actUser = async () =>  {
  await postActiveUser(selectedUser)
}

const fetchFav = async () =>  {
  const favResp = await getFav(userId)
  console.log(favResp)
    setFavorites(favResp)
}

const favHandler = () =>  {
  fetchFav()
}

useEffect(() =>  {
  fetchFav()
  actUser()
  fetchMessage()
}, [selectedUser])

useEffect(() =>  {
  const fetchData = async () =>  {
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
        <Link to='/home'>Home</Link>
        <Link to='/' onClick={logOut}>Log Out</Link>
      </header>
      <Routes>
        <Route path='/' element={<ThoughtBox />} />
        <Route path="/home" 
          element={<Home selectedUser={selectedUser} 
          favHandler={favHandler} 
          favorites={favorites} 
          activities={activities}/>}>
            <Route path='' element={<Carousel />}></Route>
            <Route path='fidgets' element={<Fidgets />}></Route>
            <Route path='sandbox' element={<Sandbox />}></Route>
          </Route>
      </Routes>
    </div>
  </BrowserRouter>
);
}

export default App;



