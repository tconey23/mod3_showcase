import { useGlobalProp } from '../../index';
import PropTypes from 'prop-types'

const Users = ({onClick}) =>  {
    let userList;

    const { userData } = useGlobalProp()

    if (userData && userData.length >  0) {
        userList = userData.map((user, index) =>  (
            <div className="dropdown-item" key={index} id={user.id} value={user.id} onClick={() =>  onClick(user)}>
                {user.name}
            </div>
        ));
    } else {
       
    }
    
    return (
        <>
            {userList}
        </>
    );
}

export default Users;

Users.propTypes = {
  userData: PropTypes.array.isRequired,
}