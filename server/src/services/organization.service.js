const { OrganizationModel } = require("../models");

function resMapper(data) {
  return {
    ...data.toObject(),
    id: data._id,
  };
}

async function modifyOrganization({ id, payload, isDelete = false }) {
  if (!id) {
    // create
    const data = await OrganizationModel.create(payload);

    return resMapper(data);
  }

  // update
  if (!isDelete) {
    const data = await OrganizationModel.findOneAndUpdate({ _id: id }, payload);

    return resMapper(data);
  }

  // delete
  await OrganizationModel.deleteOne({ _id: id });
}

async function getOrganization({ id, status }) {
  // if id applied no need to use any other query param
  if (id) {
    const data = await OrganizationModel.findOne({ _id: id });

    return resMapper(data);
  }

  const query = {};

  if (status != null) query.status = status;

  const data = await OrganizationModel.find(query);

  const mapped = data.map((item) => resMapper(item));

  return mapped;
}

module.exports = {
  getOrganization,
  modifyOrganization
};
