const { ParkingModel } = require("../models");
const { getOrganization } = require("./organization.service");
const { getBinType } = require('./binType.service');

function resMapper(data) {
    return {
        ...data.toObject(),
        id: data._id,
        spotName: data.binName,
        sensorName: data.sensorType,
        devEUI: data.deviceId,
        deviceDatetime: new Date(),
        fillPercent: data.percentageOfFull
    }
}

const modifyParking = async ({ id, payload, isDelete = false }) => {
    if (id && isDelete) {
        // delete
        await ParkingModel.deleteOne({ _id: id });

        return;
    }

    const { organizationId, binTypeId } = payload;

    // get organization
    const orgData = await getOrganization({ id: organizationId })
    if (!orgData) {
        throw new Error('Invalid org id');
    }

    // get organization
    const binTypeData = await getBinType({ id: binTypeId })
    if (!binTypeData) {
        throw new Error('Invalid bin type id');
    }

    const finalPayload = {
        ...payload,
        organizationName: orgData.name,
        binTypeName: binTypeData.binType,
        spotName: payload.binName,
    }

    if (!id) {
        const data = await ParkingModel.create(finalPayload)

        return resMapper(data);
    } else {
        const data = await ParkingModel.findOneAndUpdate({ _id: id }, finalPayload)

        return resMapper(data);
    }
};

async function getParking({ id, organizationId }) {
    // if id applied no need to use any other query param
    if (id) {
        const data = await ParkingModel.findOne({ _id: id });

        return resMapper(data);
    }

    const query = {};

    if (organizationId != null) query.organizationId = organizationId;

    const data = await ParkingModel.find(query);

    const mapped = data.map((item) => resMapper(item));

    return mapped;
}

module.exports = {
    modifyParking,
    getParking
}