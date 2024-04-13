import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { postData, getActivities } from './ApiCalls';
import { act } from 'react-dom/test-utils';

function App() {

  const [activities, setActivities] = useState()

  useEffect(() => {
    const fetchData = async () => {
        const availableActivities = await getActivities();
        setActivities(availableActivities);
        // console.log(availableActivities);
    };
    if (!activities) {
        fetchData();
    }
}, []);

  return (
    <BrowserRouter>
        <div className="App">
          <header className="App-header">
          </header>
          <Home activities={activities}/>
        </div>
    </BrowserRouter>    
  );
}

export default App;
