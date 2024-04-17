import './ThoughtBox.css'
import { useState } from 'react'
import { postThought } from '../../ApiCalls'
import Users from '../Users/Users'
import { Link } from 'react-router-dom'

const ThoughtBox = ({ userData, onUserChange }) => { // Destructure props correctly

    const [thisThought, setThought] = useState('')
    const [selectedUser, setSelectedUser] = useState('')

    const addThought = event => {
        event.preventDefault()
        const userId = 1
        const newThought = {
            id: Date.now(),
            thisThought,
        }
        postThought(userId, newThought)
        clearForm()
    }

    const clearForm = () => {
        setThought('')
    }

    const changeUser = (event) => {
        const newUser = event.target.value
        if(newUser !== 'New user')
        {
            setSelectedUser(newUser)
            onUserChange(newUser)
        } else {
            setSelectedUser(newUser)
            console.log('Add new user')
        }
    };

    return (
        <section id="thoughtBox">
            <h3>What are you feeling today?</h3>
            <form>
                <select onChange={changeUser} placeholder='Tom' value={selectedUser}>
                    <Users userData={userData}/>
                    <option>New user</option>
                </select>
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
            <div>

            </div>
        </section>
    )
}

export default ThoughtBox
