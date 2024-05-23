import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRoute = () => {
    const { currentUser } = useSelector(state => state.user);
    // console.log(currentUser.is_Admin);
    if (currentUser)
    {
        if (currentUser.is_Admin)
        {
            return <Outlet />
        } else
        {
            return <Navigate to="/" />
        }       
        
    } 
    return  <Navigate to='/sign-in' />
}

export default AdminPrivateRoute