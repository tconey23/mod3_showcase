import React, { createContext, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { getUserInfo } from "./ApiCalls";

const GlobalPropContext = createContext();

const GlobalPropProvider = ({ children }) => {
  const [userData, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [favorites, setFavorites] = useState();
  const [activities, setActivities] = useState();
  const [affirmation, setAffirmation] = useState();
  const [thisThought, setThought] = useState();
  const [allThoughts, setAllThoughts] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getUserInfo();
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  const globalPropValue = {
    favorites,
    setFavorites,
    selectedUser,
    setSelectedUser,
    userData,
    setUsers,
    activities,
    setActivities,
    setAffirmation,
    affirmation,
    thisThought,
    setThought,
    allThoughts,
    setAllThoughts,
    setLoggedIn,
    loggedIn,
  };

  return (
    <GlobalPropContext.Provider value={globalPropValue}>
      {children}
    </GlobalPropContext.Provider>
  );
};

export const useGlobalProp = () => useContext(GlobalPropContext);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalPropProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalPropProvider>,
);
