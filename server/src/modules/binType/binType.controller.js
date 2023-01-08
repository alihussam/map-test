const { sendResponse } = require("../../libraries");
const { modifyBinType, getBinType } = require("../../services/binType.service");

/**
 * Add bin type controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function addBinType(req, res, next) {
    try {
        // create payload
        const payload = { ...req.body }

        const data = await modifyBinType({ payload })

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

/**
 * Update bin type controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function updateBinType(req, res, next) {
    try {
        const { id } = req.body;

        // create payload
        const payload = { ...req.body }

        const data = await modifyBinType({ id, payload })

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

/**
 * delete bin type controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function deleteBinType(req, res, next) {
    try {
        const data = await modifyBinType({ id: req.params.id, isDelete: true })

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

/**
 * Get all bin type controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function getAllBinType(req, res, next) {
    try {
        // create
        const data = await getBinType({});

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

/**
 * Get all bin type by organization controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function getAllBinTypeByOrganization(req, res, next) {
    try {
        // create
        const data = await getBinType({ organizationId: req.params.organizationId });

        //send response back to user
        sendResponse(res, null, data)
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addBinType,
    updateBinType,
    deleteBinType,
    getAllBinType,
    getAllBinTypeByOrganization
}