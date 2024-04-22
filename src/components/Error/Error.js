import Login from "../Login/Login";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Error.css";
import PropTypes from "prop-types";
import { getActiveUser } from "../../ApiCalls";
import { useGlobalProp } from "../../index";

const Error = ({ errorType }) => {
  const {  setSelectedUser } = useGlobalProp()

  let foundUser


  useEffect(() => {
    const findLoggedInUser = async () => {
      foundUser = await getActiveUser()
      if(foundUser){
        setSelectedUser(Object.values(foundUser).toString())}
    }
    findLoggedInUser()
  }, [])

  return (
    <div id="errorHandler">
        {errorType === "bad_path" && (
        <div id="errorContainer">
          <h4>*404*</h4>
          <h5>This page wasn't found</h5>
          <Link id='errorReturn' to='/home'>Go back</Link>
        </div>
      )}
    </div>
  );
};

export default Error;

Error.propTypes = {
  errorType: PropTypes.string.isRequired,
};
