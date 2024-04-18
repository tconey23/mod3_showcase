
import './App.css';
import Home from './components/Home/Home';
import Fidgets from './components/Fidgets/Fidgets'
import Sandbox from './components/Sandbox/Sandbox'
import {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { getActivities, getFav, getUsers } from './ApiCalls';
import {Link} from 'react-router-dom'
import ThoughtBox from './components/ThoughtBox/ThoughtBox';

function App() {

  const [activities, setActivities] = useState()
  const [fetchState, setFetchState] = useState(true)
  const [retriggerFav, resetFavList] = useState(false)
  const [favorites, setFavorites] = useState()
  const [userData, setUsers] = useState()
  const [selectedUser, setSelectedUser] = useState()

  useEffect(() => {
    if(fetchState){
    const fetchData = async () => {
        const availableActivities = await getActivities();
        setActivities(availableActivities);
    };
    if (!activities) {
        fetchData();
    }
  }
}, [fetchState]);

useEffect(() => {
  const fetchFav = async () => {
  const favResp = await getFav(1)
    setFavorites(favResp)
  }
fetchFav()
}, [fetchState, retriggerFav]);

useEffect(() => {
  const fetchUsers = async () => {
    const userList = await getUsers()
    return setUsers(userList.users)
  }
  fetchUsers()
  
}, [])


const favHandler = () => {
  resetFavList(true)
}

const handleUserChange = (user) => {
  setSelectedUser(user)
}

console.log(selectedUser)

return (
  <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Link to='/home'>Home</Link>
          <Link to='/Account' >Account</Link>
      </header>
      <Routes>
        <Route path='/' element={<ThoughtBox onUserChange={handleUserChange} userData={userData}/>}/>
        <Route path="/home" element={<Home selectedUser={selectedUser} favHandler={favHandler} favorites={favorites} activities={activities} />} />
        <Route path="/fidgets" checker={'checker'} element={<Fidgets />} />
        <Route path="/sandbox" element={<Sandbox />}/>
      </Routes>
    </div>
  </BrowserRouter>
);
}

export default App;



