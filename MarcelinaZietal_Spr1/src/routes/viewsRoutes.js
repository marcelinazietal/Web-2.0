const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')
const computersController = require('../controllers/computersController');
const laptopsController = require('../controllers/laptopsController');
const userController = require('../controllers/usersController');
const middleware = require("../middleware/middleware");

// żądania z userami
router.get('', (req,res) => indexController.mainPage(req,res))
router.get('/login', (req,res) => indexController.login(req,res))
router.get('/register', (req,res) => indexController.register(req,res))
router.get('/changepassword', middleware.verifyLoggedIn, (req,res) => indexController.changepassword(req,res))

// żądania z komputerami
router.get('/addcomputer', middleware.verifyAdmin, (req,res) => computersController.getComputerForm(req,res))

// żądania z laptopami
router.get('/addlaptop', middleware.verifyAdmin, (req,res) => laptopsController.getLaptopForm(req,res))

module.exports = router