import { motion } from 'framer-motion';
import Slide from '../Slides/Slides';
import { useGlobalProp } from '../../index';
import './Carousel.css'

const Carousel = () => {

    let carouselSlides
    const { activities } = useGlobalProp()

    

    if(activities){
        carouselSlides = activities.map((slide, index) => {
           return (
            <motion.div style={{ filter: "opacity(0.50) brightness(1.4) drop-shadow(2px 4px 6px black)" }}>
                <Slide
                key={slide.id}
                actName={slide.name}
                avail={slide.available}
                id={slide.id}
                elem={slide.element}
                path={`/home${slide.path}`}
                > 
                
                </Slide>
            </motion.div>
            )
        })
    }
  return (
    <div id='carousel-parent' style={{ touchAction: "none" }}>
        <motion.div                 
            id='draggable'>
            {carouselSlides}
        </motion.div>
    </div>
  );
};

export default Carousel;