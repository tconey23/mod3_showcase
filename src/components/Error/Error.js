import ThoughtBox from "../ThoughtBox/ThoughtBox"
import { getActivities, getFav, getUsers, postActiveUser } from '../../ApiCalls'
import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "../Login/Login";
import './Error.css'

const Error = ({errorType}) => {
  console.log(errorType)

    return (
      <div id='errorHandler'>
        {errorType === 'login_lost' && 
          <div>
            <h4>Whoops! It looks like your account has been reset</h4>
            <h5>Select a user below to continue</h5>
            <Login />
          </div>
        }
      </div>
    )
}

export default Error