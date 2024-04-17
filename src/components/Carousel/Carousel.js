import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import Slide from '../Slides/Slides';
import './Carousel.css'

const Carousel = ({activities}) => {

    let carouselSlides

    if(activities){
        carouselSlides = activities.activities.map((slide, index) => {
           return (
            <motion.div>
                <Slide
                key={slide.id}
                actName={slide.name}
                avail={slide.available}
                id={slide.id}
                elem={slide.element}
                path={slide.path}
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