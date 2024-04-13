import './Slides.css'
import { useRef } from 'react'
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

function Slides({id, actName, avail}) {

    const status = () => {
        if(avail){
            return 'Playable'
        } else {
            return 'Not yet playable'
        }
    }

    return (
        <motion.div id="slide"
        whileHover={{ 
            scale: 1.2, 
            rotate: 90,
            cursor: "pointer",
            width: "230px"
        }}>
            <div id="innerContainer"
            >
                <h3>{actName}
                <NavLink to={`/${actName}`}>
                    <p>Status: {status()}</p>
                </NavLink>  
                </h3>
                
            </div>
        </motion.div>
    )

}

export default Slides

