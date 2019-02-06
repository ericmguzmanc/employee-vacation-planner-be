const EmployeeService = require('../../services/employeeService');

function getAllEmployees(req, res) {
  EmployeeService.getAllEmployees()
    .then(docs => res.json(docs))
    .catch(err => res.json(err));
}

function getEmployeeById(req, res) {
  EmployeeService.getEmployee(req)
    .then(doc => res.json(doc))
    .catch(err => res.json(err));
}

function saveEmployee(req, res) {
  EmployeeService.saveEmployee(req)
    .then(doc => res.json(doc))
    .catch(err => res.json(err));
}

function updateEmployee(req, res) {
  EmployeeService.updateEmployee(req)
    .then(doc => res.json(doc))
    .catch(err => res.json(err))
}

function deleteEmployee(req, res) {
  EmployeeService.deleteEmployee(req)
    .then(doc => res.json(doc))
    .catch(err => res.json(err));
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  saveEmployee,
  updateEmployee,
  deleteEmployee
}