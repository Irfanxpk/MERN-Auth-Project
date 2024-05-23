import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditUserModal from './EditUserModal';
import AddUserModal from './AddUserModal';
import { useDispatch } from 'react-redux';
import {signOut} from "../../redux/user/userSlice.js";

const Dashboard = () => {
  const dispatch =  useDispatch()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [fetchd,setfetchd]=useState(false) 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try
      {
        const response = await fetch('/api/admin/users');
        if (!response.ok)
        {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.users);
        setLoading(false);
      } catch (error)
      {
        setError(error.message);
        setLoading(false);
      }
    };
    setfetchd(false);

    fetchUsers();
  }, [fetchd]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
      return [...updatedUsers];
    });
    setIsEditModalOpen(false);
  };

  const handleAddUser = (newUser) => {
    // setUsers((prevUsers) => {
    //   return [...prevUsers, newUser];
    // });
    setfetchd(true);
    setIsAddModalOpen(false);
    // setfetchd(false)
  };

  if (loading)
  {
    return <div>Loading...</div>;
  }

  if (error)
  {
    return <div>Error: {error}</div>;
  }
  const handleSignOut = async () => {
    try
    {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error)
    {
      console.log(error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 px-4 pt-4 bg-white dark:bg-gray-900">
        <div>
          <button
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-blue-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add User
          </button>
        </div>
        <div>
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
          </div>
        </div>
        <div>
          <button
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-blue-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-red-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3 text-center" colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(user => !user.is_Admin).length > 0 ? (
            users.filter(user => !user.is_Admin).map((user) => (
              <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <img className="w-10 h-10 rounded-full" src={user.profilePicture} alt={`${user.username}'s profile`} />
                  <div className="ps-3">
                    <div className="text-base font-semibold">{user.username}</div>
                    <div className="font-normal text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleEditUser(user)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</button>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => navigate(`/deleteUser/${user._id}`)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete User</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUserUpdate={handleUserUpdate}
        />
      )}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUserAdded={handleAddUser}
      />
    </div>
  );
};

export default Dashboard;
