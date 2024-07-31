import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import multer from 'multer'
import userModel from '../models/userModel.js';

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Route to update user information
userRouter.put('/updateProfile', upload.single('profileImage'), async (req, res) => {
    const { name, email } = req.body;
    const profileImage = req.file ? req.file.filename : null;
    
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;
        if (profileImage) {
            user.profileImage = profileImage;
        }

        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

export default userRouter;