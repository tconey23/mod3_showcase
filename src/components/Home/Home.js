import './Home.css'
import React, { useState, useRef } from 'react';
import { useInView } from "framer-motion"
import Carousel from '../Carousel/Carousel'
import { act } from 'react-dom/test-utils';

function Home({activities}) {


      return (
        <main>
            <div id='carousel-container'>
                <Carousel activities={activities} />
            </div>
        </main>
      );
}


export default Home