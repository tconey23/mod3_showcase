import ThoughtBox from "../ThoughtBox/ThoughtBox"
import { getActivities, getFav, getUsers, postActiveUser } from '../../ApiCalls'
import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const Landing = () => {

    const [userData, setUsers] = useState()
    const [selectedUser, setSelectedUser] = useState()
    const [userId, setUserId] = useState('');
    const [retriggerFav, resetFavList] = useState(false)
    const [favorites, setFavorites] = useState()

    useEffect(() => {
        const fetchUsers = async () => {
          const userList = await getUsers()
          return setUsers(userList.users)
        }
        fetchUsers()
        
      }, [])

      useEffect(() => {
        const actUser = async () => {
         await postActiveUser(selectedUser)
        }
        actUser()
      }, [selectedUser]);

      useEffect(() => {
        const fetchFav = async () => {
        const favResp = await getFav(userId)
          setFavorites(favResp)
          
        }
      fetchFav()
      }, [userId, retriggerFav]);

      const handleUserChange = (user) => {
        setUserId(user.split(',')[0])
        setSelectedUser(user.split(',')[1])
      }

      const favHandler = () => {
        resetFavList(true)
      }
      

    return (
        <ThoughtBox onUserChange={handleUserChange} userData={userData}/>
    )
}

export default Landing