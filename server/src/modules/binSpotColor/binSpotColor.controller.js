const { sendResponse } = require('../../libraries');
const { BinSpotColorModel } = require('../../models');
const { getOrganization } = require('../../services/organization.service');

function resMapper(data) {
    return {
        ...data.toObject(),
        id: data._id,
        binSpotColorId: data._id,
    }
}

/**
 * Add bin spot color controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function addBinSpotColor(req, res, next) {
    try {
        // create payload
        const payload = { ...req.body }

        // get organization
        if (payload.organizationId) {
            // find org
            const org = await getOrganization({ id: payload.organizationId });
            if (!org) {
                throw new Error('Organization not found');
            }

            payload.organizationName = org.name;
        }

        // create
        const data = await BinSpotColorModel.create(payload);

        //send response back to user
        sendResponse(res, null, resMapper(data))
    } catch (error) {
        next(error);
    }
};

/**
 * Update bin spot color controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function updateBinSpotColor(req, res, next) {
    try {
        const { binSpotColorId } = req.body;

        // create payload
        const payload = { ...req.body }

        // get organization
        if (payload.organizationId) {
            // find org
            const org = await getOrganization({ id: payload.organizationId });
            if (!org) {
                throw new Error('Organization not found');
            }

            payload.organizationName = org.name;
        }

        // create
        const data = await BinSpotColorModel.findOneAndUpdate({ _id: binSpotColorId }, payload);

        //send response back to user
        sendResponse(res, null, resMapper(data))
    } catch (error) {
        next(error);
    }
};

/**
 * Delete bin spot color controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function deleteBinSpotColor(req, res, next) {
    try {
        // delete
        await BinSpotColorModel.deleteOne({ _id: req.params.id });

        //send response back to user
        sendResponse(res, null, null)
    } catch (error) {
        next(error);
    }
};

/**
 * Get all bin spot color controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function getAllBinSpotColor(req, res, next) {
    try {
        // create
        const data = await BinSpotColorModel.find({});

        //send response back to user
        sendResponse(res, null, data.map(color => resMapper(color)))
    } catch (error) {
        next(error);
    }
};

/**
 * Get all bin spot color by organization controller
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
async function getAllBinSpotColorByOrganization(req, res, next) {
    try {
        // create
        const data = await BinSpotColorModel.find({ organizationId: req.params.organizationId });

        //send response back to user
        sendResponse(res, null, data.map(color => resMapper(color)))
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addBinSpotColor,
    updateBinSpotColor,
    deleteBinSpotColor,
    getAllBinSpotColor,
    getAllBinSpotColorByOrganization
}