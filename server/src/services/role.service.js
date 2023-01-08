const { RoleModel } = require("../models")

function resMapper(data) {
    return {
        ...data.toObject(),
        id: data._id,
    };
}

async function getRole({ id, status }) {
    if (id) {
        const data = await RoleModel.findOne({ _id: id })

        return resMapper(data);
    }

    const query = {}

    if (status != null) query.status = status;

    const data = await RoleModel.find(query)

    const mapped = data.map((item) => resMapper(item));

    return mapped;
}

module.exports = {
    getRole
}