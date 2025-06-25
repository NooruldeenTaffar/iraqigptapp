const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['landlord', 'tenant'], required: true },
  gender: { type: String, enum: ['male', 'female'] },
  refreshToken: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
