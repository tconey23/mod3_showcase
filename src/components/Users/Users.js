

const Users = (userData) => {

    let userList

    if(userData.userData){
        userList = userData.userData.map((user, index) => {
            return (
                <option key={index} id={user.id} value={user.name}>{user.name}</option>
            )
        })
    } else {
        // console.error("userData is undefined");
    }
    
    return (

        <>
            {userList}
        </>
    )
}

export default Users