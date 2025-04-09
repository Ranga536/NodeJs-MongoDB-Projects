
const isAdminUser = (req, res, next) => {
    if (req.userInfo.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: "Access denied! you are not authorized to access this resource"
        })
    }
    next();
}

module.exports = isAdminUser;