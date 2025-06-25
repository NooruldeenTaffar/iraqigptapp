const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = require('../config/config');

const generateToken = (user, secret, expiresIn) =>
  jwt.sign({ id: user._id }, secret, { expiresIn });

exports.register = async (req, res) => {
  try {
    const { email, password, name, phone, role, gender } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, name, phone, role, gender });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(user, JWT_SECRET, '1h');
    const refresh = generateToken(user, REFRESH_TOKEN_SECRET, '7d');
    user.refreshToken = refresh;
    await user.save();
    res.json({ token, refresh });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refresh } = req.body;
    const payload = jwt.verify(refresh, REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== refresh) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const token = generateToken(user, JWT_SECRET, '1h');
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.me = async (req, res) => {
  res.json(req.user);
};
