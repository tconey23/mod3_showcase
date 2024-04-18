
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Fidgets from './components/Fidgets/Fidgets';
import Sandbox from './components/Sandbox/Sandbox';
import ThoughtBox from './components/ThoughtBox/ThoughtBox';
import './App.css'
import { getActivities, getFav, getUsers, postActiveUser } from './ApiCalls';

const GlobalPropContext = createContext();

const GlobalPropProvider = ({ children, onUserChange }) => {
  const [userData, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getUsers();
      setUsers(userList.users);
    };
    fetchUsers();
  }, []);

  const globalPropValue = { userData, setUsers, onUserChange };

  return (
    <GlobalPropContext.Provider value={globalPropValue}>
      {children}
    </GlobalPropContext.Provider>
  );
};

export const useGlobalProp = () => useContext(GlobalPropContext);

function App() {

  const [activities, setActivities] = useState()
  const [retriggerFav, resetFavList] = useState(false)
  const [favorites, setFavorites] = useState()
  const [userData, setUsers] = useState()
  const [selectedUser, setSelectedUser] = useState()
  const [userId, setUserId] = useState('')

useEffect(() => {
  const fetchData = async () => {
      const availableActivities = await getActivities();
      setActivities(availableActivities);
  };
  if (!activities) {
      fetchData();
  }

}, []);

useEffect(() => {
  const fetchFav = async () => {
  const favResp = await getFav(userId)
    setFavorites(favResp)
    console.log(favResp)
  }
fetchFav()
}, [userId, selectedUser]);

useEffect(() => {
  if(selectedUser){
  const actUser = async () => {
   await postActiveUser(selectedUser)
  }
  actUser()
}
}, [selectedUser]);

const favHandler = () => {
  resetFavList(true)
}

const handleUserChange = (user) => {
  localStorage.setItem('activeUser', user.split(',')[1])
  setUserId(user.split(',')[0])
  setSelectedUser(user.split(',')[1])
}

const changeUser = () => {
  localStorage.setItem('activeUser', "")
  setUserId("")
  setSelectedUser("")
}

//console.log(selectedUser)

return (
  <GlobalPropProvider onUserChange={handleUserChange}>
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Link to='/home'>Home</Link>
          <Link to='/' onClick={changeUser}>Log Out</Link>
        </header>
        <Routes>
          <Route path='/' element={<ThoughtBox onUserChange={handleUserChange} userData={userData} />} />
          <Route path="/home" element={<Home selectedUser={selectedUser} favHandler={favHandler} favorites={favorites} activities={activities} />} />
          <Route path="/fidgets" checker={'checker'} element={<Fidgets />} />
          <Route path="/sandbox" element={<Sandbox />} />
        </Routes>
      </div>
    </BrowserRouter>
  </GlobalPropProvider>
);
}

export default App;



