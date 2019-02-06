function setIncrementForGivenModel(CounterModel, counterColumnName, next) {
  const doc = this;
  CounterModel.findByIdAndUpdate({ _id: counterColumnName }, { $inc: { seq: 1} }, function (err, counter) {
    if (err) {
      return next(err);
    }

    doc.counterColumnName = counter.seq;
    next();
  });
}

module.exports = {
  setIncrementForGivenModel
}