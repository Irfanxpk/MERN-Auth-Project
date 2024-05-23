import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase.js';
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
} from '../../redux/user/userSlice';

const EditUserModal = ({ user, isOpen, onClose, onUserUpdate }) => {
    const dispatch = useDispatch();
    const fileRef = useRef(null);

    const [image, setImage] = useState(null);
    const [imagePercent, setImagePercent] = useState(0);
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
    });

    useEffect(() => {
        if (image)
        {
            handleFileUpload(image);
        }
    }, [image]);

    const handleFileUpload = (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, profilePicture: downloadURL });
                });
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);
            if (!res.ok)
            {
                dispatch(updateUserFailure(data));
                return;
            }
            // dispatch(updateUserSuccess(data));
            onUserUpdate(data);
            onClose(); // Close the modal after successful update
        } catch (error)
        {
            dispatch(updateUserFailure(error));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">Edit User</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="file"
                        ref={fileRef}
                        hidden
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <img
                        src={formData.profilePicture}
                        alt="profile"
                        className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
                        onClick={() => fileRef.current.click()}
                    />
                    <p className="text-sm self-center">
                        {imagePercent > 0 && imagePercent < 100 ? (
                            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
                        ) : imagePercent === 100 ? (
                            <span className="text-green-700">Image uploaded successfully</span>
                        ) : (
                            ''
                        )}
                    </p>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        className="bg-slate-100 rounded-lg p-3"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="bg-slate-100 rounded-lg p-3"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
                        Update
                    </button>
                    <button
                        type="button"
                        className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 mt-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
