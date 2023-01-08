const { UserModel } = require("../models");
const { getOrganization } = require("./organization.service");
const { getRole } = require("./role.service");

function resMapper(data) {
    return {
        ...data,
        id: data._id,
        userId: data._id,
        password: undefined
    };
}

const modifyUser = async ({ id, payload, isDelete }) => {
    if (id && isDelete) {
        // delete
        await UserModel.deleteOne({ _id: id });

        return;
    }

    const { roleId, organizationId } = payload;

    // first get role using role id
    const roleData = await getRole({ id: roleId })
    if (!roleData) {
        throw new Error('Invalid role id');
    }

    // get organization
    const orgData = await getOrganization({ id: organizationId })
    if (!orgData) {
        throw new Error('Invalid org id');
    }

    const finalPayload = {
        ...payload,
        displayName: `${payload.firstName} ${payload.lastName}`,
        roleDescription: roleData.description || 'Role description',
        organizationName: orgData.name,
        role: roleData.key,
        menu: [{
            href: '/organization',
            name: 'Organization'
        }, {
            href: '/user',
            name: 'User'
        }, {
            href: '/bin-spot',
            name: 'Bin Configuration'
        }, {
            href: '/bin-spot-color',
            name: 'Bin spot color',
        }],
    }

    if (!id) {
        const data = (await UserModel.create(finalPayload)).safeModel();

        return resMapper(data);
    } else {
        const data = (await UserModel.findOneAndUpdate({ _id: id }, finalPayload)).safeModel();

        return resMapper(data);
    }

};

async function getUser({ id, organizationId }) {
    // if id applied no need to use any other query param
    if (id) {
        const data = await UserModel.findOne({ _id: id });

        return resMapper(data.toObject());
    }

    const query = {};

    if (organizationId) query.organizationId = organizationId;

    const data = await UserModel.find(query);

    const mapped = data.map((item) => resMapper(item.toObject()));

    return mapped;
}

module.exports = {
    getUser,
    modifyUser
};
