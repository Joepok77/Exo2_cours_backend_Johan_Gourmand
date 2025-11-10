const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Login - Connexion
exports.login = async (req, res, next) => {
  let { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  if (!existingUser) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }

  // Comparer le mot de passe avec bcrypt
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  if (!isValidPassword) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }

  let token;
  try {
    // Creating jwt token
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_SECRET || "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    },
  });
};

// Signup - Inscription
exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Hasher le mot de passe avec bcrypt
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch {
    const error = new Error("Error! Could not hash password.");
    return next(error);
  }

  const newUser = User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email
      },
      process.env.JWT_SECRET || "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  res.status(201).json({
    success: true,
    data: {
      userId: newUser.id,
      email: newUser.email,
      token: token
    },
  });
};
