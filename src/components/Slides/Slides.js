import "./Slides.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Slides.css";
import Bubble from "./bubbleButton";
import PropTypes from "prop-types";

function Slides({ actName, avail, path }) {
  return (
    <motion.div id="bubble">
      <Bubble />
      {avail && <Link id="linkToPage" to={path}>Play!</Link>}
      {!avail && <p id='status'>Currently unavailable</p>}
      <h3 id="slideName">{actName}</h3>
    </motion.div>
  );
}

export default Slides;

Slides.propTypes = {
  actName: PropTypes.string.isRequired,
  avail: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
