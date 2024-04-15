import './Slides.css'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import propFidgetPNG from '../../assets/g396.png'
import './Slides.css'

function Slides({id, actName, avail}) {

    const [hover, setHover] = useState(false);

    const status = () => {
        if(avail){
            return 'Playable'
        } else {
            return 'Not yet playable'
        }
    }

    return (
        <motion.div
            id="slide"
            initial={{
                scale: 1,
                rotate: 0,
                width: "200px"
            }}
            animate={{
                scale: hover ? 1.1 : 0.9,
                cursor: hover ? "pointer" : "none",
                boxShadow: '(black 8px 9px 20px)',
                transition: { duration: 0.5 }
            }}
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            style={{
                backgroundColor: "#ccc",
                width: "300px",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "20px",
                boxShadow: '(black 4px 5px 20px)'
            }}
        >
            <div id="innerContainer"
            >
                <h3>{actName}
                <NavLink to={`/${actName}`}>
                    <p>Status: {status()}</p>
                </NavLink>  
                </h3>

                {actName === 'fidgets' && <img src={propFidgetPNG} width="100px" height="100px" />}
                
            </div>
        </motion.div>
    )

}

export default Slides

