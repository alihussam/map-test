const router = require('express').Router();
const { addBinSpotColor, getAllBinSpotColor, getAllBinSpotColorByOrganization, updateBinSpotColor, deleteBinSpotColor } = require('./binSpotColor.controller');

router.get('/find', getAllBinSpotColor);

router.get('/find/organization/:organizationId', getAllBinSpotColorByOrganization);

router.post('/add', addBinSpotColor);

router.post('/update', updateBinSpotColor);

router.get('/delete/:id', deleteBinSpotColor);

module.exports = router;