const { sendResponse } = require("../../libraries");
const { getUser, modifyUser } = require("../../services/user.service");

/**
 * Add user controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const addUser = async (req, res, next) => {
    try {
        const data = await modifyUser({ payload: req.body });

        sendResponse(res, null, data);
    } catch (error) {
        next(error);
    }
}

/**
 * Update user controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.body;

        const data = await modifyUser({ id, payload: req.body });

        sendResponse(res, null, data);
    } catch (error) {
        next(error);
    }
}

/**
 * Delete user controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const deleteUser = async (req, res, next) => {
    try {
        const data = await modifyUser({ id: req.params.id, isDelete: true });

        sendResponse(res, null, data);
    } catch (error) {
        next(error);
    }
}

/**
 * Get all users controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const getAllUsers = async (req, res, next) => {
    try {
        const data = await getUser({});

        sendResponse(res, null, data);
    } catch (error) {
        next(error);
    }
}

/**
 * Get users by organization controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const getAllUsersByOrganization = async (req, res, next) => {
    try {
        const data = await getUser({ organizationId: req.params.organizationId });

        sendResponse(res, null, data);
    } catch (error) {
        next(error);
    }
}

/**
 * Get user by id controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const getUserById = async (req, res, next) => {
    try {
        const data = await getUser({ id: req.params.id });

        sendResponse(res, null, data);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getAllUsersByOrganization
}