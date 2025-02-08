import express from 'express';
import { SupportTicket } from '../models/SupportTicketModel.js';
import authenticateToken from '../middleware/AuthenticateToken.js';
import authorizeAdmin from '../middleware/AuthorizeAdmin.js';

const router = express.Router();

//userid, subject, msg , status, createdat, updatedat
//create support ticket
router.post('/submit-support-query', authenticateToken, async (req, res) => {
    if(!req.body.subject || !req.body.msg) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    try {
        const { id } = req.user;
        const { subject, msg } = req.body;

        const supportTicket = new SupportTicket({
            userId: id,
            subject,
            msg,
            status: 'Pending'
        });

        await supportTicket.save();

        const notification = new Notification({
            userId: order.userId,
            message: `Your support ticket with Ticket#${supportTicket._id} has been forwarded.`
        });

        await notification.save();
        res.status(200).json({ message: 'Support Ticket created successfully', supportTicket });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" , error});
    }
});

//get all support tickets for a user
router.get('/view-all', authenticateToken, async (req, res) => {
    try {
        const { id } = req.user;
        const tickets = await SupportTicket.findOne({ userId: id });
        if(!tickets) {
            return res.status(404).json({ message: "No tickets found." });
        }

        res.status(200).json({ tickets });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" , error});
    }
});

//get all support tickets
//admin + management only
router.get('/view-all-tickets', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const tickets = await SupportTicket.find();
        if(!tickets) {
            return res.status(404).json({ message: "Tickets not found." });
        }

        res.status(200).json({ tickets });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" , error});
    }
});

//update ticket status
//admin + management only
router.put('/update-status/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await SupportTicket.findOneAndUpdate({ _id: ticketId }, { status: 'Completed' });
        if(!ticket) {
            return res.status(404).json({ message: "Ticket not found." });
        }

        const notification = new Notification({
            userId: order.userId,
            message: `Your support ticket with Ticket#${ticket._id} has been completed.`
        });

        await notification.save();
        res.status(200).json({ message: "Ticket status updated successfully." , ticket });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" , error});
    }
});

//get a support ticket
router.get('/view-ticket/:id', authenticateToken, async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await SupportTicket.findOne({ _id: ticketId });
        if(!ticket) {
            return res.status(404).json({ message: "Ticket not found." });
        }

        res.status(200).json({ ticket });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" , error});
    }
});

export default router;
