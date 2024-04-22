import React, { useState, useEffect } from "react";
import { useGlobalProp } from "../../index";
import PropTypes from "prop-types";

import Users from "../Users/Users";

const Login = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userData, selectedUser, setSelectedUser} = useGlobalProp();

  const changeUser = (event) => {
    if (event.name) {    
        setSelectedUser(event);
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
            <span>{selectedUser.name}</span>
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
  selectedUser: PropTypes.string,
  userData: PropTypes.array,
  setSelectedUser: PropTypes.func,
  setUserId: PropTypes.func,
};
