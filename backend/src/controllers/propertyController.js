const Property = require('../models/Property');
const cloudinary = require('../config/cloudinary');

exports.list = async (req, res) => {
  const filters = req.query;
  const properties = await Property.find(filters).populate('owner', 'name phone');
  res.json(properties);
};

exports.create = async (req, res) => {
  try {
    const { title, description, city, price, genderPreference } = req.body;
    const images = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      images.push(result.secure_url);
    }
    const property = await Property.create({
      title,
      description,
      city,
      price,
      genderPreference,
      images,
      owner: req.user._id
    });
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name phone');
    if (!property) return res.status(404).json({ error: 'Not found' });
    res.json(property);
  } catch (err) {
    res.status(404).json({ error: 'Not found' });
  }
};
