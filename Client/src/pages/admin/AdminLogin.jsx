import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminSignInSuccess, adminSignInFailure } from '../../redux/admin/adminSlice.js';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSignIn = () => {
        // Validate username and password (this is a simple example, you might want to use more secure methods)
        if (username == "admin" )
        {
            // Dispatch action to update admin authentication state upon successful login
            dispatch(adminSignInSuccess({ username: 'admin' }));
            navigate('/')
        } else
        {
            // Dispatch action to update admin authentication state upon login failure
            dispatch(adminSignInFailure('Invalid username or password'));
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <div>
                <label>Username: </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleSignIn}>Sign In</button>
            {error && <div>{error}</div>}
        </div>
    );
}

export default AdminLogin;
