import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getUsers } from './ApiCalls';  // Ensure you have this import if you're using it

const GlobalPropContext = createContext();

const GlobalPropProvider = ({ children }) => {
  const [userData, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [userId, setUserId] = useState('');
  const [favorites, setFavorites] = useState();
  const [activities, setActivities] = useState();
  const [retriggerFav, resetFavList] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getUsers();
      console.log(userList);
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  const handleUserChange = (user) => {
    const userParts = user.split(',');
    setUserId(userParts[0]);
    setSelectedUser(userParts[1]);
  };

  const globalPropValue = {
    favorites,
    setFavorites,
    selectedUser,
    setSelectedUser,
    userData,
    setUsers,
    userId,
    setUserId,
    activities,
    setActivities,
    resetFavList,
    retriggerFav,
    handleUserChange
  };

  return (
    <GlobalPropContext.Provider value={globalPropValue}>
      {children}
    </GlobalPropContext.Provider>
  );
};

export const useGlobalProp = () => useContext(GlobalPropContext);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalPropProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalPropProvider>
);
