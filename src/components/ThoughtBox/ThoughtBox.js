import React from "react";
import "./ThoughtBox.css";
import { postThought, getUserData } from "../../ApiCalls";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { useGlobalProp } from "../../index";
import PropTypes from "prop-types";

const ThoughtBox = () => {
  const {
    selectedUser,
    userId,
    thisThought,
    setThought,
    setLoggedIn,
    setAllThoughts,
  } = useGlobalProp();


  const navigate = useNavigate();

  const addThought = async (event) => {
    event.preventDefault();
    const newThought = {
      id: Date.now(),
      thought: thisThought
    }
   const updatedThoughts = await postThought(selectedUser.id, newThought);
   setAllThoughts(updatedThoughts.thoughts)
   setLoggedIn(true);
   navigate(`/home`);
   clearForm();
  };

  const clearForm = () => {
    setThought("");
  };



  return (
    <section id="thoughtBox">
      {selectedUser && <h3>Hello {selectedUser.name}! What are you feeling today?</h3>}
      <form>
        <Login />
        {selectedUser && 
        <span>
          <Link to="/home">skip</Link>
            <input
            type="text"
            placeholder=""
            name="thought"
            value={thisThought}
            onChange={(event) => setThought(event.target.value)}
          />
          {thisThought && <button onClick={addThought}>Add</button>}
        </span>
        }
      </form>
      <div></div>
    </section>
  );
};

export default ThoughtBox;

ThoughtBox.propTypes = {
  setAllThoughts: PropTypes.func,
  loggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func,
  setThought: PropTypes.func,
  thisThought: PropTypes.string,
  selectedUser: PropTypes.string
};
