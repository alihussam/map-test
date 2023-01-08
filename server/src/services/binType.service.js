const { BinTypeModel } = require("../models");
const { getOrganization } = require("./organization.service");

function resMapper(data) {
    return {
        ...data.toObject(),
        id: data._id,
    }
}

const modifyBinType = async ({ id, payload, isDelete = false }) => {
    if (id && isDelete) {
        // delete
        await BinTypeModel.deleteOne({ _id: id });

        return;
    }

    const { organizationId } = payload;

    // get organization
    const orgData = await getOrganization({ id: organizationId })
    if (!orgData) {
        throw new Error('Invalid org id');
    }

    const finalPayload = {
        ...payload,
        organizationName: orgData.name,
    }

    if (!id) {
        const data = await BinTypeModel.create(finalPayload)

        return resMapper(data);
    } else {
        const data = await BinTypeModel.findOneAndUpdate({ _id: id }, finalPayload)

        return resMapper(data);
    }
};

async function getBinType({ id, organizationId }) {
    // if id applied no need to use any other query param
    if (id) {
        const data = await BinTypeModel.findOne({ _id: id });

        return resMapper(data);
    }

    const query = {};

    if (organizationId != null) query.organizationId = organizationId;

    const data = await BinTypeModel.find(query);

    const mapped = data.map((item) => resMapper(item));

    return mapped;
}

module.exports = {
    modifyBinType,
    getBinType
}