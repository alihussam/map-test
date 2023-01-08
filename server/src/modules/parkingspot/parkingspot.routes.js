const { addParking, updateParking, deleteParking, getAllParkings, getAllParkingsByOrganization } = require('./parkingspot.controller');

const router = require('express').Router();

router.post('/add', addParking)

router.post('/update', updateParking)

router.get('/delete/:id', deleteParking)

router.get('/find-all', getAllParkings);

router.get('/findbyOrgId/:organizationId', getAllParkingsByOrganization);

module.exports = router;