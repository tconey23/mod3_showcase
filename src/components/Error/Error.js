import Login from "../Login/Login";
import "./Error.css";
import PropTypes from "prop-types";

const Error = ({ errorType }) => {
  return (
    <div id="errorHandler">
      <div id="screenCover"></div>
      {errorType === "login_lost" && (
        <div>
          <h4>Whoops! It looks like your account has been reset</h4>
          <h5>Select a user below to continue</h5>
          <div id="loginContainer">
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default Error;

Error.propTypes = {
  errorType: PropTypes.string.isRequired,
};
