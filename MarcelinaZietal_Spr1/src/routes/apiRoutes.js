const express = require('express');
const JWT = require('jwt-async');
const router = express.Router();
const computersController = require('../controllers/computersController');
const laptopsController = require('../controllers/laptopsController');
const userController = require('../controllers/usersController');
const middleware = require("../middleware/middleware");

// żądania z użytkownikami
router.post('/login', (req,res) => userController.login(req,res))
router.get('/logout', middleware.verifyLoggedIn, (req,res) => userController.logout(req,res))
router.post('/register', (req,res) => userController.createUser(req,res))
router.get('/activate/:token', (req,res) => userController.activateUser(req,res))
router.post('/changepassword', middleware.verifyLoggedIn, (req,res) => userController.changepassword(req,res))
router.get('/users', middleware.verifyAdmin, (req,res) => userController.adminPanel(req,res))
router.post('/createuser', middleware.verifyAdmin, (req,res) => userController.createUserByAdmin(req,res))
router.post('/deleteuser/:id', middleware.verifyAdmin, (req,res) => userController.deleteUser(req,res))
router.post('/changeprivileges/:id', middleware.verifyAdmin, (req,res) => userController.changePrivileges(req,res))

// żądania z komputerami
router.get('/computers', (req,res) => computersController.getAllComputers(req,res))
router.get('/computers/edit/:id', middleware.verifyAdmin, (req,res) => computersController.editComputer(req,res))
router.post('/computers/save/:id', middleware.verifyAdmin, (req,res) => computersController.updateComputerAndShowAll(req,res))
router.get('/computers/delete/:id', middleware.verifyAdmin, (req,res) => computersController.deleteComputerAndShowAll(req,res))
router.get('/computers/:id', (req,res) => computersController.getComputerById(req,res))
router.post('/computer', middleware.verifyAdmin, (req,res) => computersController.createComputer(req,res))
router.put('/computers/:id', middleware.verifyAdmin, (req,res) => computersController.updateComputer(req,res))
router.delete('/computers/:id', middleware.verifyAdmin, (req,res) => computersController.deleteComputer(req,res))

// żądania z laptopami
router.get('/laptops', (req,res) => laptopsController.getAllLaptops(req,res))
router.get('/laptops/edit/:id', middleware.verifyAdmin, (req,res) => laptopsController.editLaptop(req,res))
router.post('/laptops/save/:id', middleware.verifyAdmin, (req,res) => laptopsController.updateLaptopAndShowAll(req,res))
router.get('/laptops/delete/:id', middleware.verifyAdmin, (req,res) => laptopsController.deleteLaptopAndShowAll(req,res))
router.get('/laptops/:id', (req,res) => laptopsController.getLaptopById(req,res))
router.post('/laptop', middleware.verifyAdmin, (req,res) => laptopsController.createLaptop(req,res))
router.put('/laptops/:id', middleware.verifyAdmin, (req,res) => laptopsController.updateLaptop(req,res))
router.delete('/laptops/:id', middleware.verifyAdmin, (req,res) => laptopsController.deleteLaptop(req,res))

module.exports = router;