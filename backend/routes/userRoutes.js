const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// User registration route
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('role', 'Role must be either creative or business').isIn(['creative', 'business']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        role,
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const savedUser = await user.save();

      // Return JWT and user ID
      const payload = { user: { id: savedUser.id, role: savedUser.role } };
      jwt.sign(
        payload,
        'yourSecretKey', // Replace with your secret key
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, id: savedUser.id });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// User login route
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Return JWT and user ID
      const payload = { user: { id: user.id, role: user.role } };
      jwt.sign(
        payload,
        'yourSecretKey', // Replace with your own secret key
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          console.log("User ID:", user.id); // Should print the user ID to the server console
           console.log("User Data:", user); 
           console.log("Returning user ID:", user._id.toString());// Verify all user data
          res.json({ token, id: user.id });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get user account details (requires authentication)
router.get('/account', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user account details (requires authentication)
router.put('/account', auth, async (req, res) => {
  const { name, email, password } = req.body;
  const updatedData = {};

  if (name) updatedData.name = name;
  if (email) updatedData.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updatedData.password = await bcrypt.hash(password, salt);
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedData },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete user account (requires authentication)
router.delete('/account', auth, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.user.id);
    res.json({ msg: 'Account deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Unified profile routes

// Get user profile by ID (public access)
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update profile by ID (requires authentication and own profile access)
router.put('/profile/:id', auth, async (req, res) => {
  if (req.user.id.toString() !== req.params.id) {
    return res.status(403).json({ msg: 'Unauthorized to edit this profile' });
  }

  const { name, bio, profilePic, mediums, servicesNeeded, partnershipOpportunities } = req.body;
  const updatedProfile = { name, bio, profilePic, mediums, servicesNeeded, partnershipOpportunities };

  try {
    const profile = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedProfile },
      { new: true }
    ).select('-password');
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Save files to the /uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for image files only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only images are allowed'), false);
  }
};

// Initialize multer with storage and file filter
const upload = multer({ storage, fileFilter });

// Route to upload a profile picture
router.post('/upload/profile-picture', auth, upload.single('profilePic'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  res.json({ filePath: `/uploads/${req.file.filename}`, fileName: req.file.filename });
});

// Route to upload multiple portfolio pictures
router.post('/upload/portfolio-pictures', auth, upload.array('portfolioPics', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ msg: 'No files uploaded' });
  }
  const fileDetails = req.files.map(file => ({
    filePath: `/uploads/${file.filename}`,
    fileName: file.filename
  }));
  res.json({ files: fileDetails });
});

module.exports = router;
