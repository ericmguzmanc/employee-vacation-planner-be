const EmployeeModel = require('../db/models/employee');

async function getAllEmployees() {
  const promise = new Promise((resolve, reject) => {
    EmployeeModel.find({ employeeActive: true })
      .then(doc => resolve(doc))
      .catch(err => reject(err));
  });

  const response = await promise;
  return response;

}

async function getEmployee(req) {

  query = { employeeCode: req.params.employeeCode }

  const promise = new Promise((resolve, reject) => {
    EmployeeModel.find(query)
      .then(doc => resolve(doc))
      .catch(err => reject(err));
  });

  const response = await promise;
  return response;
}

// Saves or updates an Employee
async function saveEmployee(req) {

  const Employee = new EmployeeModel({
    name: req.body.name,
    lastName: req.body.lastName,
    title: req.body.title || null,
    // employeeCode: EmployeeModel.employeeCode,
    employeeMail: req.body.employeeMail,
    employeePhoto: req.body.employeePhoto || null,
    vacationActive: req.body.vacationActive || false,
    vacationStarts: req.body.vacationStarts || null,
    vacationEnds: req.body.vacationEnds || null,
    employeeActive: req.body.employeeActive || true
  })

  const promise = new Promise((resolve, reject) => {
    Employee.save()
    .then(doc => {
        resolve(doc);
      })
    .catch(err => { 
      if (err.message) {
        reject({ success: false, message: err.message})
      }
      reject({ success: false, message: err }) 
    })
  });

  const response = await promise;
  return response;
}

async function updateEmployee(req) {
  const Employee = 
    {
    name: req.body.name,
    lastName: req.body.lastName,
    title: req.body.title || null,
    // employeeCode: req.body.employeeCode,
    employeeMail: req.body.employeeMail,
    employeePhoto: req.body.employeePhoto || null,
    vacationActive: req.body.vacationActive || false,
    vacationStarts: req.body.vacationStarts || null,
    vacationEnds: req.body.vacationEnds || null,
    employeeActive: req.body.employeeActive || true
  }

  query = { employeeCode: req.params.employeeCode }; 
  update = Employee;
  options = { upsert: true }

  const promise = new Promise((resolve, reject) => {
    EmployeeModel.update(
      query,
      Employee,
      options
    )
    .then(doc => {
        resolve(doc);
      })
    .catch(err => { 
      if (err.message) {
        reject({ success: false, message: err.message})
      }
      reject({ success: false, message: err }) 
    })
  });

  const response = await promise;
  return response;
}

async function deleteEmployee (req) {
  const query = { employeeCode: req.params.employeeCode };
  const update = { employeeActive: false };
  const options = { new: true };

  const promise = new Promise((resolve, reject) => {
    EmployeeModel.findOneAndUpdate(
      query,
      update,
      options
    )
    .then(doc => resolve(doc))
    .catch(err => {
      if (err.message) {
        reject({ success: false, message: err.message })
      }
      reject({ success: false, message: err })
    });
  });

  const resolve = await promise;
  return resolve;
}

module.exports = {
  getAllEmployees,
  getEmployee,
  saveEmployee,
  updateEmployee,
  deleteEmployee
}