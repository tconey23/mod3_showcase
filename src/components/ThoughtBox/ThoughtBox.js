import React, { useState, useGlobalProp } from 'react';
import './ThoughtBox.css';
import { postThought } from '../../ApiCalls';
import Users from '../Users/Users';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';

const ThoughtBox = ({ userData, onUserChange }) => {
    const [thisThought, setThought] = useState('');
    const addThought = event => {
        event.preventDefault();
        const userId = 1;
        const newThought = {
            id: Date.now(),
            thisThought,
        };
        postThought(userId, newThought);
        clearForm();
    };

    const clearForm = () => {
        setThought('');
    };

    return (
        <section id="thoughtBox">
            <h3>What are you feeling today?</h3>
            <form>
                <Login />
                <Link to='/home'>skip</Link>
                <input
                    type='text'
                    placeholder=''
                    name='thought'
                    value={thisThought}
                    onChange={event => setThought(event.target.value)}
                />
                <button onClick={addThought}>Add</button>
            </form>
            <div></div>
        </section>
    );
};

export default ThoughtBox