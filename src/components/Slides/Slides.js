import './Slides.css'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import propFidgetPNG from '../../assets/g396.png'
import './Slides.css'
import bubbleButton from './bubbleButton.svg'
import Bubble from './bubbleButton'

function Slides({id, actName, avail, elem, path}) {

    const durations = [2.5, 3, 3.2, 2]
    const [duration, setDuration] = useState(durations[0]);

    const delays = [0.1, 0, 0.5, 0.9]
    const [delay, setDelay] = useState(delays[0]);

    useEffect(() => {
        // Function to select a random duration
        const pickRandomDuration = () => {
            const randomIndex = Math.floor(Math.random() * durations.length);
            return durations[randomIndex];
        };
        const pickRandomDelay = () => {
            const randomIndex = Math.floor(Math.random() * delays.length);
            return delays[randomIndex];
        };

        // Set the random duration on component mount
        setDuration(pickRandomDuration());
        setDelay(pickRandomDelay());
    }, []);  // Empty dependency array ensures this effect runs only once on mount

    const status = () => {
        if(avail){
            return 'Playable'
        } else {
            return 'Not yet playable'
        }
    }

    return (
        <motion.div
        id='bubble'
        animate={{
            y: ["0%", "4%", "0%"]
          }}
          transition={{ 
            duration: duration, 
            ease: "easeInOut",
            repeat: Infinity, 
            repeatType: "loop",
            delay: delay 
        }}
        >
            <Bubble />
            <Link id="linkToPage" to={path}/>
            <h3 id='slideName'>{actName}</h3>
        </motion.div>
    )

}

export default Slides

