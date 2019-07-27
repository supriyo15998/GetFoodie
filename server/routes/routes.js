const express = require('express');
const router = express.Router();
const foodcontroller = require('../controller/foodController');
//const picscontroller = require('../controller/picsController');
const userController = require('../controller/userController');
const adminController = require('../controller/adminController');
const categoryController = require('../controller/categoryController');
const jwtHelper = require('../config/jwtHelper');


//CRUD on foods

router.post('/foods',foodcontroller.registerFood);
router.get('/foods',foodcontroller.getFood);
router.get('/foods/:id',foodcontroller.getFoodById);
router.put('/foods/:id',foodcontroller.updateFood);
router.delete('/foods/:id',foodcontroller.deleteFood);
//get food by category id
router.get('/foods/userfood/:id',foodcontroller.getFoodCatID);

//admin login and signup

router.post('/admin/signup',adminController.registerAdmnin);
router.post('/admin/login',adminController.loginAdmin);
router.get('/adminProfile',jwtHelper.verifyJwtToken,adminController.adminProfile);
//view all registered user
router.get('/adminProfile/regUser',jwtHelper.verifyJwtToken,adminController.getRegUsers);
router.get('/adminProfile/viewOrders',jwtHelper.verifyJwtToken,adminController.viewOrders);

//user login and signup

router.post('/users/signup',userController.registerUser);
router.post('/users/login',userController.loginUser);
router.get('/userProfile',jwtHelper.verifyJwtToken,userController.userProfile);

//place order
router.post('/userProfile/placeOrder',jwtHelper.verifyJwtToken, userController.placeOrder);
//CRUD on categories

router.post('/categories',categoryController.insertCategory);
router.get('/categories',categoryController.getCategory);
router.get('/categories/:id',categoryController.getCategoryById);
router.delete('/categories/:id',categoryController.deleteCategory);
router.put('/categories/:id',categoryController.editCategory);
module.exports = router;