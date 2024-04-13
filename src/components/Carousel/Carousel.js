import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useDragControls } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import Slide from '../Slides/Slides';
import './Carousel.css'

const Carousel = ({activities}) => {

    const ref = useRef(null)

    const controls = useDragControls()

    const startDrag = (event) => {
        event.stopPropagation();
        controls.start(event);
      };

    const handleWrapAround = () => {
        console.log()
    };


    let carouselSlides

    if(activities){
        carouselSlides = activities.activities.map((slide, index) => {
           return (
                <Slide
                key={slide.id}
                actName={slide.name}
                avail={slide.available}
                id={slide.id}
                >
                </Slide>
            )
        })
    }


  return (
    <div id='carousel-parent' onPointerDown={startDrag} style={{ touchAction: "none" }}>
        <motion.div                 
                id='dragabble'
                drag="x"
                dragControls={controls}
                onDrag={handleWrapAround}
                style={{
                    display: "flex",
                    position: "relative",
                    userSelect: "none",
                    touchAction: "pan-x",
                    transform: "translateX(99.4399px) translateY(0px) translateZ(0px)",
                    marginTop: "25px",
                    width: "max-content",
                }}
                >
            {carouselSlides}
        </motion.div>
    </div>
  );
};

export default Carousel;
