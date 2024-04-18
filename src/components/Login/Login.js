import React, { useState } from 'react';
import { useGlobalProp } from '../../App';
import Users from '../Users/Users';

const Login = () => {
    const [selectedUser, setSelectedUser] = useState('');
    const [userId, setUserId] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { onUserChange, userData } = useGlobalProp()

    console.log(userData)

    const changeUser = (event) => {
        console.log('change user', event.name)
        if (event.name) {
            const newUser = `${event.id},${event.name}`
            const userId = event.id
            if (newUser !== 'New user') {
                setSelectedUser(newUser);
                setUserId(userId);
                onUserChange(newUser, userId);
            } else {
                setSelectedUser(newUser);
                //console.log('Add new user');
            }
        } else {
            addNewUser();
        }
        setDropdownOpen(prevState => !prevState);
    }

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    }

    const addNewUser = () => {
        // Implement functionality to add a new user
    }

    return (
        <div id='userSelection'>
        <div className="dropdown">
            <div className="dropdown-toggle" onClick={toggleDropdown}>      
                {selectedUser ? (
                    <span>{selectedUser.split(',')[1]}</span>
                ) : (
                    <span>Select User</span>
                )}
            </div>
            {dropdownOpen && (
                <div className="dropdown-menu" id="dropdownMenu">
                    <Users className="dropdown-item" onClick={changeUser} userData={userData} />
                    <div className="dropdown-item" onClick={changeUser}>New user</div>
                </div>
            )}
        </div>
    </div>
    )
}

export default Login