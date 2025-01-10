const authorizeAdmin = (req, res, next) => {
    if(!req.user || req.user.role != 'Admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    next();
}

export default authorizeAdmin;