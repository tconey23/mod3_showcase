import PropFidget from "../../assets/fidget"
import YinyangFidget from "../../assets/fidget2"
import FlowerFidget from "../../assets/fidget3"
import { Link } from "react-router-dom";
import {useState} from 'react'
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
    const [selectedFidget, setSelectedFidget] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleFidgetChange = (event) => {
        const selectedValue = event.target.id;
        setIsOpen(false)
        switch (selectedValue) {
            case 'PropFidget':
                setSelectedFidget(<PropFidget id='fidget' />);
                break;
            case 'YinyangFidget':
                setSelectedFidget(<YinyangFidget id='fidget' />);
                break;
            case 'FlowerFidget':
                setSelectedFidget(<FlowerFidget id='fidget' />);
                break;
            default:
                setSelectedFidget(null);
                break;
        }

    const resetFidget = () => {
        
    }

        
    };

    return (
    <section id='fidgetComponent'>
        <section id='menu'>
        <div id="dropdown">
            <div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                Fidgets
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                // onClick={resetFidget}
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
        {selectedFidget && <motion.div>{selectedFidget}</motion.div>}
    </section>
    )
}

export default Fidgets