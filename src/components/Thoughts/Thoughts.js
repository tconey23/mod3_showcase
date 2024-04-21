import "./Thoughts.css";
import React, { useEffect } from "react";
import { useGlobalProp } from "../../index";
import PropTypes from "prop-types";

const Thoughts = () => {
  let thoughtList = [];
  const { allThoughts } = useGlobalProp();

  if (allThoughts["thoughts"]) {
    thoughtList = allThoughts["thoughts"].map((thought, index) => {
      return (
        <div className="favs-thoughts" id={`thought${index}`} key={index}>
          {thought}
        </div>
      );
    });
    allThoughts["thoughts"].forEach((thought) =>
      console.log(thought.thisThought),
    );
  }

  return (
    <div id="thoughtList">
      <h4>Your thoughts</h4>
      {thoughtList}
    </div>
  );
};
export default Thoughts;

Thoughts.propTypes = {
  allThoughts: PropTypes.array,
};
