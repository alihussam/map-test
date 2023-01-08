const { sendResponse } = require("../../libraries");
const { getOrganization, modifyOrganization } = require("../../services/organization.service");

/**
 * Add organization controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function addOrganization(req, res, next) {
    try {
        const data = await modifyOrganization({ payload: req.body });

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

/**
 * Update organization controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function updateOrganization(req, res, next) {
    try {
        const { id } = req.body;

        const data = await modifyOrganization({ id, payload: req.body });

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

/**
 * Delete organization controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function deleteOrganization(req, res, next) {
    try {

        await modifyOrganization({ id: req.params.id, isDelete: true })

        //send response back to user
        sendResponse(res, null, null)
    } catch (error) {
        next(error);
    }
};

/**
 * Get organization by id controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function getOrganizationById(req, res, next) {
    try {
        // create
        const data = await getOrganization({ id: req.params.id });

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

/**
 * Get all organizations controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function getAllOrganizations(req, res, next) {
    try {
        // create
        const data = await getOrganization({});

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

/**
 * Get all active organizations controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function getAllActiveOrganizations(req, res, next) {
    try {
        // create
        const data = await getOrganization({ status: 1 });

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addOrganization,
    updateOrganization,
    deleteOrganization,
    getOrganizationById,
    getAllOrganizations,
    getAllActiveOrganizations,
}