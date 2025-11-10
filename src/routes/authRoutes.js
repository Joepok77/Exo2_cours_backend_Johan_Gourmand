const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');

// Routes publiques (pas besoin d'authentification)
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Route pour tester et décoder le token
router.get('/accessResource', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  //Authorization: 'Bearer TOKEN'

  if (!token) {
    return res.status(200).json({
      success: false,
      message: "Error! Token was not provided."
    });
  }

  try {
    // Decoding the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secretkeyappearshere");
    res.status(200).json({
      success: true,
      data: {
        userId: decodedToken.userId,
        email: decodedToken.email
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
});

module.exports = router;
