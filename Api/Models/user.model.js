import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
        
    },
    profilePicture: {
        type: String,
        default:"https://assets-global.website-files.com/60a226b47b39dcc52c9046b0/60ffd7a32fd7d132a7273d4e_User.png",
    },
    is_Admin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

export default User;