const { getAllRoles, getAllActiveRoles } = require('./role.controller');

const router = require('express').Router();

router.get('/find-all-roles', getAllRoles)

router.get('/find-all-active-roles', getAllActiveRoles)

module.exports = router;