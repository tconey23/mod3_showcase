import './Slides.css'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import './Slides.css'
import Bubble from './bubbleButton'

function Slides({id, actName, avail, elem, path}) {

    console.log(path)
    console.log(`home/${path}`)


    const durations = [2.5, 3, 3.2, 2]
    const [duration, setDuration] = useState(durations[0])

    const delays = [0.1, 0, 0.5, 0.9]
    const [delay, setDelay] = useState(delays[0])

    useEffect(() => {
        const pickRandomDuration = () => {
            const randomIndex = Math.floor(Math.random() * durations.length)
            return durations[randomIndex]
        }
        const pickRandomDelay = () => {
            const randomIndex = Math.floor(Math.random() * delays.length)
            return delays[randomIndex];
        }
        setDuration(pickRandomDuration())
        setDelay(pickRandomDelay())
    }, [])

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

