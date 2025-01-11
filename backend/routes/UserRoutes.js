import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/UserModel.js';
import { Cart } from '../models/CartModel.js';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middleware/AuthenticateToken.js';
import dotenv from 'dotenv';
import authorizeAdmin from '../middleware/AuthorizeAdmin.js';

dotenv.config();
const router = express.Router();


//User Routes
//register a new user
router.post('/register', async (req, res) => {
    //verify all fields have been filled
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.phone
    ) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    //extract data
    const { name, email, password, phone } = req.body;

    try {
        //check if email exists or not
        const existingEmail = await User.findOne({ email });
        if(existingEmail) {
            return res.status(400).send({ message: 'Email already in use.'});
        }

        //once confirmed uniqueness of email
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new User({
            name,
            role: 'User',
            email,
            passwordHash,
            phone
        });

        //save new user
        const savedUser = await newUser.save();

        // Automatically create a cart for the user
        const newCart = new Cart({
            userId: savedUser._id,
            items: [],
            cartTotal: 0,
        });

        await newCart.save();
        res.status(201).json({ message: 'User registered successfully!'});
    }
    catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
});

//user login
router.post('/login', async (req, res) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser) {
            return res.status(400).send({ message: 'Email does not exist!!'});
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash);
        if(!isPasswordValid) {
            return res.status(400).send({ message: 'Password invalid!!' });
        }

        const payload = {
            id: existingUser._id,
            role: existingUser.role,
            email: existingUser.email
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d'});
        existingUser.refreshToken = refreshToken;
        await existingUser.save();
        res.status(200).json({ message: 'Login Successful', accessToken, refreshToken, user: { name: existingUser.name, email: existingUser.email, role: existingUser.role } });
    }
    catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
});

//user logout
router.put('/logout', authenticateToken, async (req, res) => {
    const { refreshToken } = req.body;
    if(!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required.'});
    }

    try{
        const existingUser = await User.findOneAndUpdate(
            { refreshToken },
            { refreshToken: null}
        );

        if(!existingUser) {
            return res.status(400).json({ messge: 'Invalid refresh token'});
        }

        res.status(200).json({ message: 'Logout Successfully'});
    }
    catch(error) {
        res.status(501).json({ message: 'Server error', error});
    }
});

//route for refreshing jwt token
router.post('/refresh-token', authenticateToken, async (req, res) => {
    const { refreshToken } = req.body;
    if(!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required.'});
    }

    try {
        const existingUser = await User.findOne({ refreshToken });
        if(!existingUser) {
            return res.status(403).json({ message: 'Invalid RefreshToken'});
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, payload) => {
            if(error) {
                return res.status(403).json({ message: 'Invalid or expired refresh token.'});
            }

            const newAccessToken = jwt.sign(
                {
                    id: payload.id,
                    email: payload.email
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '15m'
                }
            );

            res.status(200).json({ accessToken: newAccessToken});
        });
    }
    catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
});

//route to display user's profile page
router.get('/profile-page/:id', authenticateToken, async (req, res) => {
    try {   
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json({ user: user});
    }
    catch(error) {
        res.status(500).json({ message: 'Server error!', error });
    }
});

//reset password
router.post('/reset-password/:id', authenticateToken, async (req, res) => {
    if(!req.body.password || !req.body.newPassword) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    const id = req.params.id;
    const { password, newPassword } = req.body;
    

    try {
        const existingUser = await User.findById(id);

        if(!existingUser) {
            return res.status(404).json({ message: 'User not found.', existingUser });
        }
        
        //check for old password validity
        const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash);
        if(!isPasswordValid) {
            return res.status(400).send({ message: 'Password invalid!!' });
        }

        //once old password is verified
        //Hash the new password
        const salt = await bcrypt.genSalt(10);
        const newPasswordHash = await bcrypt.hash(newPassword, salt);
        existingUser.passwordHash = newPasswordHash;
        existingUser.save();
        res.status(200).json({ message: 'Password Reset Successful', user: existingUser });
    }
    catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
});

//update profile
router.put('/update-profile/:id', authenticateToken, async (req,res) => {
    //verify all fields have been filled
    if(!req.body.name || !req.body.email
        || !req.body.phone 
    ) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    try {
        const id = req.params.id;
        const existingUser = await User.findByIdAndUpdate(id, req.body);
        if(!existingUser) {
            return res.status(404).json({ message: 'User not found.', existingUser });
        }
        
        res.status(201).json({ message: 'User updated successfully!'});
    }
    catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }

});

//Admin Only Routes
//register admin route
router.post('/register-admin', authenticateToken, authorizeAdmin, async (req, res) => {
    //verify all fields have been filled
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.phone
    ) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    //extract data
    const { name, email, password, phone } = req.body;

    try {
        //check if email exists or not
        const existingEmail = await User.findOne({ email });
        if(existingEmail) {
            return res.status(400).send({ message: 'Email already in use.'});
        }

        //once confirmed uniqueness of email
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new User({
            name,
            role: 'Admin',
            email,
            passwordHash,
            phone
        });

        //save new user
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!'});
    }
    catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
});

//list all users(admin-only)
router.get('/list-all', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users: users });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" });
    }
});


//delete users route (admin-only)
router.delete('/delete-user/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
            const id = req.params.id;
            const result = await User.findByIdAndDelete(id);
    
            if(!result) {
                return res.status(404).json({ message: 'User not found.' });
            }
    
            res.status(201).json({ message: 'User deleted successfully!'});
        }
        catch(error) {
            res.status(500).json({ message: "Server error" , error});
        }
});

//search users by name(admin-only)
router.get('/search-user', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const { name } = req.body;
        const user = await User.findOne({ name });
        return res.status(200).json({ user });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" , error});
    }
});

export default router;