import React, { useState } from "react";
import { useGlobalProp } from "../../index";
import PropTypes from "prop-types";

import Users from "../Users/Users";

const Login = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userData, selectedUser, setSelectedUser, setUserId } =
    useGlobalProp();

  const changeUser = (event) => {
    if (event.name) {
      const newUser = `${event.id},${event.name}`;
      const userId = event.id;
      if (newUser !== "New user") {
        setSelectedUser(newUser);
        setUserId(userId);
      } else {
        setSelectedUser(newUser);
      }
    } else {
    }
    setDropdownOpen((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <div id="userSelection">
      <div className="dropdown">
        <div className="dropdown-toggle" onClick={toggleDropdown}>
          {selectedUser ? (
            <span>{selectedUser.split(",")[1]}</span>
          ) : (
            <span>Select User</span>
          )}
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu" id="dropdownMenu">
            <Users
              className="dropdown-item"
              onClick={changeUser}
              userData={userData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

Login.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  userData: PropTypes.array,
  setSelectedUser: PropTypes.func,
  setUserId: PropTypes.func,
};
