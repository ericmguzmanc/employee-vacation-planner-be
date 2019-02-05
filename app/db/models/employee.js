const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CounterModel = require('./counter');


const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  employeeCode: {
    type: Number,
    // required: true
  },
  employeeMail: {
    type: String,
    required: true
  },
  employeePhoto: {
    type: String
  },
  vacationActive: {
    type: Boolean,
    required: false
  },
  vacationStarts: {
    type: Date
  },
  vacationEnds: {
    type: Date
  },
  employeeActive: {
    type: Boolean,
    required: true
  }
});

EmployeeSchema.pre('save', function(next) {
  const doc = this;
  CounterModel.findByIdAndUpdate({ _id: 'employeeCode' }, { $inc: { seq: 1} }, function (err, counter) {
    if (err) {
      return next(err);
    }

    doc.employeeCode = counter.seq;
    next();
  });
})

module.exports = mongoose.model("Employee", EmployeeSchema);

