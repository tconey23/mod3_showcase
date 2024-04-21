import "./Thoughts.css";
import React, { useEffect } from "react";
import { useGlobalProp } from "../../index";
import PropTypes from "prop-types";

const Thoughts = () => {
  let thoughtList = [];
  const { allThoughts } = useGlobalProp();

  console.log(allThoughts)
  if (allThoughts) {
    thoughtList = allThoughts.map((thought) => {
      return (
        <div className="favs-thoughts" id={thought.id} key={thought.id}>
          {thought.thought}
        </div>
      );
    });
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
