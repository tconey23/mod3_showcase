import PropFidget from "../../assets/fidget"
import YinyangFidget from "../../assets/fidget2"
import FlowerFidget from "../../assets/fidget3"
import {useEffect, useState} from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import propFidgetPNG from '../../assets/g396.png'
import yinyangFidgetPNG from '../../assets/g127.png'
import flowerFidgetPNG from '../../assets/g665.png'
import './Fidgets.css'

const dropdownVariants = {
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    collapsed: { opacity: 0, height: 0, transition: { duration: 0.3 } }
  };

function Fidgets() {
    const [selectedFidget, setSelectedFidget] = useState();
    const [fidgetName, setFidgetName] = useState()
    const [isOpen, setIsOpen] = useState(false)

    const handleFidgetChange = (event) =>  {
        const selectedValue = event.target.id;
        switchFidget(selectedValue)
        setIsOpen(false)
    }

    const switchFidget = (selectedValue) => {
        console.log(selectedValue)
        switch (selectedValue) {
            case 'PropFidget':
                setSelectedFidget(<PropFidget id='fidget' />)
                setFidgetName(selectedValue)
                break;
            case 'YinyangFidget':
                setSelectedFidget(<YinyangFidget id='fidget' />)
                setFidgetName(selectedValue)
                break;
            case 'FlowerFidget':
                setSelectedFidget(<FlowerFidget id='fidget' />)
                setFidgetName(selectedValue)
                break;
            default:
                setSelectedFidget(null);
                break;
        } 
    }
        const resetFidget = async () => {
            await setSelectedFidget(null)
            switchFidget(fidgetName)
        }

    return (
    <section id='fidgetComponent'>
        <section id='menu'>
        <div id="dropdown">
            <div>
            <motion.button
            id='fidgetMenu'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>  setIsOpen(!isOpen)}
            >
                Fidgets
            </motion.button>
            <motion.button
            id='fidgetMenu'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>  resetFidget()}
            >
                Reset
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                <motion.div
                    variants={dropdownVariants}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                >
                    <motion.button onClick={handleFidgetChange} whileHover={{ backgroundColor: "#ddd" }}>
                        <img id='PropFidget' value='PropFidget' src={propFidgetPNG} alt="Prop Fidget" />
                    </motion.button>
                    <motion.button onClick={handleFidgetChange} whileHover={{ backgroundColor: "#ddd" }}>
                        <img id='YinyangFidget' value='YinyangFidget' src={yinyangFidgetPNG} alt="Yin Yang Fidget" />
                    </motion.button>
                    <motion.button onClick={handleFidgetChange} whileHover={{ backgroundColor: "#ddd" }}>
                        <img id='FlowerFidget' value='FlowerFidget' src={flowerFidgetPNG} alt="Flower Fidget" />
                    </motion.button>
                </motion.div>
                )}
            </AnimatePresence>
            </div>
        </div>
        </section>
        <div id='fidgetContainer'>
            {selectedFidget && <motion.div >{selectedFidget}</motion.div>}
        </div>
    </section>
    )
}

export default Fidgets