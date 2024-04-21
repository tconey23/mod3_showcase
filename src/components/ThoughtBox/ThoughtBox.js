import React from "react";
import "./ThoughtBox.css";
import { postThought, getFav } from "../../ApiCalls";
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

  const addThought = (event) => {
    event.preventDefault();
    fetchThoughts();
    const newThought = thisThought;
    postThought(userId, newThought);
    clearForm();
  };

  const fetchThoughts = async () => {
    const thoughtResp = await getFav(userId);
    setAllThoughts(thoughtResp);
    setLoggedIn(true);
    navigate(`/home`);
  };

  const clearForm = () => {
    setThought("");
  };

  return (
    <section id="thoughtBox">
      <h3>What are you feeling today?</h3>
      <form>
        <Login />
        {selectedUser && <Link to="/home">skip</Link>}
        <input
          type="text"
          placeholder=""
          name="thought"
          value={thisThought}
          onChange={(event) => setThought(event.target.value)}
        />
        <button onClick={addThought}>Add</button>
      </form>
      <div></div>
    </section>
  );
};

export default ThoughtBox;

ThoughtBox.propTypes = {
  userId: PropTypes.number.isRequired,
  setAllThoughts: PropTypes.func,
  loggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func,
  setThought: PropTypes.func,
  thisThought: PropTypes.string,
  selectedUser: PropTypes.string.isRequired,
};
