import User from "../models/userModel.js"
import bctyptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Register = async (req, res) => {
    try {
        const {name, email, password} = req.body 
        const checkuser = await User.findOne({email})
        if(checkuser){
            // user already registered
            res.status(400).json({
            message : false,
            message : "email is already there in the database"
        })
        }
        const hashedPassword = bctyptjs.hashSync(password)
        const user = new User({
            name , email, password : hashedPassword
        })

        await user.save();

        res.status(200).json({
            message : true,
            message : "Registration successfull"
        })
        
    } catch (error) {
        res.status(500).json({
            message : false,
            message : "internal sever errror"
        })
    }
}

export const Logout = async (req, res) => {
    try {
        
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        });

        res.status(200).json({
            success: true,
            message: "logout successful"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email not found"
            });
        }

        const isPasswordCorrect = await bctyptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' } // optional: add token expiry
        );

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};