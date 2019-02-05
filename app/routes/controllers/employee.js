const EmployeeService = require('../../services/employeeService');

async function getAllEmployees(req, res) {
  await EmployeeService.getAllEmployees()
      .then(docs => res.json(docs))
      .catch(err => res.json(err));
}

async function getEmployeeById(req, res) {
  await EmployeeService.getEmployee(req)
      .then(doc => res.json(doc))
      .catch(err => res.json(err));
}

async function saveEmployee(req, res) {
  await EmployeeService.saveEmployee(req)
      .then(doc => res.json(doc))
      .catch(err => res.json(err));
}

async function updateEmployee(req, res) {
  await EmployeeService.updateEmployee(req)
      .then(doc => res.json(doc))
      .catch(err => res.json(err))
}

async function deleteEmployee(req, res) {
  await EmployeeService.deleteEmployee(req)
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