const express = require('express');
const { signup, login } = require('../Controller/authController');
const {createStudent} = require('../Controller/studentController');
const { viewStudentforSearch } = require('../Controller/viewStudentController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/addStudent',createStudent);
router.post('/viewStudent',viewStudentforSearch)

module.exports = router;