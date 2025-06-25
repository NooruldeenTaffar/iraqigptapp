exports.validateIraqiPhone = (phone) => /^\+964\d{10}$/.test(phone);

exports.validateIQD = (value) => /^\d+(?:\.\d{1,3})?$/.test(value);
