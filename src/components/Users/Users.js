import { useGlobalProp } from '../../index';

const Users = ({onClick}) =>  {
    let userList;

    const { onUserChange, userData } = useGlobalProp()


    if (userData && userData.length >  0) {
        userList = userData.map((user, index) =>  (
            <div className="dropdown-item" key={index} id={user.id} value={user.id} onClick={() =>  onClick(user)}>
                {user.name}
            </div>
        ));
    } else {
        // Handle case when userData is undefined or empty
    }
    
    return (
        <>
            {userList}
        </>
    );
}

export default Users;