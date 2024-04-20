import './Slides.css'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import './Slides.css'
import Bubble from './bubbleButton'

function Slides({id, actName, avail, elem, path}) {


    return (
        <motion.div
        id='bubble'
        >
            <Bubble />
            <Link id="linkToPage" to={path}/>
            <h3 id='slideName'>{actName}</h3>
        </motion.div>
    )

}

export default Slides

