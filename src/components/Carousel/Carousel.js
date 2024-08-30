import { motion } from "framer-motion";
import Slide from "../Slides/Slides";
import { useGlobalProp } from "../../index";
import "./Carousel.css";
import PropTypes from "prop-types";

const durations = [2.5, 3, 3.2, 2, 1.8];
const delays = [0.1, 0, 0.5, 0.9, 0.3];

const Carousel = () => {
  const { activities } = useGlobalProp();
  const pickRandom = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const randomDurations = activities
    ? activities.map(() => pickRandom(durations))
    : [];
  const randomDelays = activities
    ? activities.map(() => pickRandom(delays))
    : [];

  const carouselSlides = activities
    ? activities.map((slide, index) => {
        return (
          <motion.div
            key={slide.id}
            style={{
              filter:
                "opacity(0.50) brightness(1.4) drop-shadow(2px 4px 6px black)",
            }}
            animate={{
              y: ["0%", "5%", "0%"],
            }}
            transition={{
              duration: randomDurations[index],
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: randomDelays[index],
            }}
          >
            <Slide
              actName={slide.name}
              avail={slide.available}
              id={slide.id}
              elem={slide.element}
              path={`/home${slide.path}`}
            />
          </motion.div>
        );
      })
    : [];

  return (
    <div id="carousel-parent" style={{ touchAction: "none" }}>
      <motion.div id="draggable">{carouselSlides}</motion.div>
    </div>
  );
};

export default Carousel;

Carousel.propTypes = {
  activities: PropTypes.array,
};
