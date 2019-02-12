const express = require('express');
const router = express.Router();

const AuthMiddleware = require('./middleware/auth')

const AuthController = require('./controllers/auth');
const UserController = require('./controllers/user');
const EmployeeController = require('./controllers/employee')

router.get('/setup', UserController.userSetup);

// User
router.post('/auth/user', AuthController.authenticateUser);
router.get('/api/user', AuthMiddleware.validateToken, UserController.getAllUsers);
router.post('/signup', UserController.register);

// Employee
router.get('/api/employee', AuthMiddleware.validateToken, EmployeeController.getAllEmployees);
router.post('/api/employee', AuthMiddleware.validateToken, EmployeeController.saveEmployee);
router.get('/api/employee/:employeeCode', AuthMiddleware.validateToken, EmployeeController.getEmployeeById);
router.put('/api/employee/:employeeCode', AuthMiddleware.validateToken, EmployeeController.updateEmployee);
router.delete('/api/employee/:employeeCode', AuthMiddleware.validateToken, EmployeeController.deleteEmployee);

module.exports = router