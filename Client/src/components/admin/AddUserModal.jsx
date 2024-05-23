// AddUserModal.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import OAuth from "../components/OAuth";

const AddUserModal = ({ isOpen, onClose, onUserAdded }) => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            setLoading(true);
            setError(null);

            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setLoading(false);
            console.log(data);
            if (!data.success)
            {
                setError('Something went wrong.');
                return;
            }

            onUserAdded(formData); // Call the callback to add the user to the list
            onClose(); // Close the modal
        } catch (err)
        {
            setLoading(false);
            setError('Something went wrong.');
        }
    };

    if (!isOpen)
    {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Add User</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="bg-slate-100 p-3 rounded-lg"
                        id="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        className="bg-slate-100 p-3 rounded-lg"
                        id="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        className="bg-slate-100 p-3 rounded-lg"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button
                        disabled={loading}
                        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                        type="submit"
                    >
                        {loading ? 'Loading...' : 'Sign up'}
                    </button>
                    {/* <OAuth /> */}
                </form>
                {error && <p className="text-red-700 mt-5">{error}</p>}
                <button className="mt-4 text-blue-500" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default AddUserModal;
