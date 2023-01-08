const { getAllOrganizations, getAllActiveOrganizations, getOrganizationById, addOrganization, updateOrganization, deleteOrganization } = require('./organization.controller');

const router = require('express').Router();

router.post('/add', addOrganization);

router.post('/update', updateOrganization);

router.get('/delete/:id', deleteOrganization);

router.get('/find-all', getAllOrganizations);

router.get('/find-all-active', getAllActiveOrganizations);

router.get('/find/:id', getOrganizationById);


module.exports = router;