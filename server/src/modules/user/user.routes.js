const { getAllUsers, getUserById, getAllUsersByOrganization, addUser, updateUser, deleteUser } = require('./user.controller');

const router = require('express').Router();

router.post('/add-user', addUser);

router.post('/update-user', updateUser)

router.get('/delete-user/:id', deleteUser)

router.get('/find-all-users', getAllUsers)

router.get('/find-user-by-id/:id', getUserById)

router.get('/find-by-organization/:organizationId', getAllUsersByOrganization)

module.exports = router;