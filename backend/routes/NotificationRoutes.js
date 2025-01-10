import express from 'express';
import authenticateToken from '../middleware/AuthenticateToken.js';
import { Notification } from '../models/NotificationModel.js';

const router = express.Router();

//fetch notifications for a user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const { id } = req.user;
        const notifications = await Notification.find({ userId: id });
        res.status(200).json({ notifications });
    }
    catch(error) {
        res.status(500).json({ message: "Server error", error });
    }
});

//mark notification as read
router.put('/:id/read', authenticateToken, async (req, res) => {
    try {
        const _id = req.params.id;
        const notification = await Notification.findByIdAndUpdate({ _id }, { isRead: true });
        if(!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({ notification });
    }
    catch(error) {
        res.status(500).json({ message: "Server error", error });
    }
});


export default router;