const { sendResponse } = require("../../libraries");
const { getRole } = require("../../services/role.service");

/**
 * Get all roles controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const getAllRoles = async (req, res, next) => {
    try {
        const data = await getRole({})

        sendResponse(res, null, data);
    } catch (error) {
        next(error);
    }
}

/**
 * Get all active role controller
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const getAllActiveRoles = async (req, res, next) => {
    try {
        const data = await getRole({ status: 1 })

        sendResponse(res, null, data);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllRoles,
    getAllActiveRoles,
}