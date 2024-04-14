import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Fidgets from './components/Fidgets/Fidgets'
import {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes, useParams} from 'react-router-dom';
import { postData, getActivities, getMessage } from './ApiCalls';
import { act } from 'react-dom/test-utils';
import { motion, animate } from "framer-motion";
import {Link} from 'react-router-dom'

function App() {

  const [activities, setActivities] = useState()
  const [affirmations, setAffirmations] = useState()

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


useEffect(() => {
  const fetchData = async () => {
    const response = await getMessage();
    setAffirmations(response);
  };

  fetchData(); 

  const timerId = setInterval(fetchData, 10000);

  return () => clearInterval(timerId);
}, []);

function useRectangleAnimation() {
  return {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: {
      duration: 10,
    }
  };
}

const animationProps = useRectangleAnimation();

return (
  <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Link to='/Home' >Home</Link>
        <motion.div id='messages'
                      initial={{ opacity: 1 }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        repeatDelay: 9
                    }}
        >{affirmations}</motion.div>
        <motion.svg id="loading" width="550px" height="200px" >
            <motion.rect
              filter="drop-shadow(2px 4px 6px pink) blur(2px)"
              width="500"
              height="67"
              x="28"
              y="58"
              stroke="#f88397"
              strokeWidth="2"
              fill="transparent"
              {...animationProps}
            />
          </motion.svg>
          <Link to='/Account' >Account</Link>
      </header>
      <Routes>
        <Route path="/home" element={<Home activities={activities} />} />
        <Route path="/fidgets" checker={'checker'} element={<Fidgets />} />
      </Routes>
    </div>
  </BrowserRouter>
);
}

export default App;



