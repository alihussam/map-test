const { sendResponse } = require("../../libraries");
const { modifyBinType, getBinType } = require("../../services/binType.service");
const { modifyParking, getParking } = require("../../services/parking.service");

/**
 * Add parking controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function addParking(req, res, next) {
    try {
        // create payload
        const payload = { ...req.body }

        const data = await modifyParking({ payload })

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

/**
 * Update parking controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function updateParking(req, res, next) {
    try {
        const { id } = req.body;

        // create payload
        const payload = { ...req.body }

        const data = await modifyParking({ id, payload })

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

/**
 * delete parking controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function deleteParking(req, res, next) {
    try {
        const data = await modifyParking({ id: req.params.id, isDelete: true })

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

/**
 * Get all parkings controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function getAllParkings(req, res, next) {
    try {
        // create
        const data = await getParking({});

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

/**
 * Get all parking by organization controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function getAllParkingsByOrganization(req, res, next) {
    try {
        // create
        const data = await getParking({ organizationId: req.params.organizationId });

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addParking,
    updateParking,
    deleteParking,
    getAllParkings,
    getAllParkingsByOrganization
}