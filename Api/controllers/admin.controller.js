import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const adminSignin = async (req, res, next) => {
    const { email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try
    {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(401, "User Not Found"));
        console.log(email, password)
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong Credintials"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res
            .cookie("access_token", token, {
                httpOnly: true,
                expires: expiryDate,
            })
            .status(200)
            .json(rest);
    } catch (err)
    {
        next(err);
    }
};

export const users = async (req,res) => {
    try {
        const users = await User.find()
        res.json({users})
    } catch (error) {
        res.status(500).json({ message: err.message }); 
    }
}

export const updateUser = async (req, res, next) => {
    console.log("");
    if (req.user.id !== req.params.id)
    {
        return next(errorHandler(401, 'You can update only your account!'));
    }
    try
    {
        if (req.body.password)
        {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error)
    {
        next(error);
    }
};

export const blockUser = async (req, res) => {
    try
    {
        console.log("asdfasdf");
        const user = await User.findById(req.params.id);
        if (!user)
        {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.isBlocked = true;
        await user.save();
        res.json({ success: true, user });
    } catch (error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const unblockUser = async (req, res) => {
    try
    {
        const user = await User.findById(req.params.id);
        if (!user)
        {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.isBlocked = false;
        await user.save();
        res.json({ success: true, user });
    } catch (error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
};