const { getAllBinType, getAllBinTypeByOrganization, addBinType, updateBinType, deleteBinType } = require('./binType.controller');

const router = require('express').Router();

router.post('/add', addBinType)

router.post('/update', updateBinType)

router.get('/delete/:id', deleteBinType)

router.get('/find-all', getAllBinType);

router.get('/findbyOrgId/:organizationId', getAllBinTypeByOrganization);

module.exports = router;