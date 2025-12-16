const express = require('express');
const { signup, login } = require('../Controller/authController');
const {createStudent} = require('../Controller/studentController');
const { viewStudentforSearch } = require('../Controller/viewStudentController');
const router = express.Router();
// const muttler = require.mutler();
const multer = require('multer');
const { selectGenderController } = require('../Controller/selectGenderController');
const Auth = require('../Middleware/Auth');
const { casteController } = require('../Controller/casteController');
const { stateController } = require('../Controller/stateController');
const { searchController } = require('../Controller/searchController');
const { classController } = require('../Controller/classController');
const { subjectController } = require('../Controller/subjectController');
const { marksSubmitController } = require('../Controller/marksSubmitController');
const { failureController } = require('../Controller/failureController');
const {highestMarkController} = require(`../Controller/highestMarkController`)
const upload = multer();
//muttler use kiya formdata ko accept krne ke liye
// router.post('/signup', signup);
// router.post('/login', login);
router.post('/addStudent',createStudent);
router.post('/viewStudent', upload.none(), viewStudentforSearch);
router.post('/getGender',Auth,selectGenderController);
router.post('/getCaste',Auth,casteController);
router.post('/getState',Auth,stateController);
router.post('/searchstud',upload.none(),Auth,searchController)
router.post('/getclass',Auth,classController)
router.post('/getsubject',upload.none(), Auth,subjectController)
router.post('/markssubmit',Auth,upload.none(),marksSubmitController),
router.post('/failedStudentData',Auth,upload.none(),failureController)
router.post('/highestMark',Auth,upload.none(),highestMarkController)
module.exports = router;