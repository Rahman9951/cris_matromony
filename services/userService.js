// services/userService.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authenticateToken, authorize } = require('../middlewares/authMiddleware');
class UserService {
  static isStrongPassword(password) {
    // Add your password strength criteria here
    // For example, at least 8 characters, with a mix of uppercase, lowercase, numbers, and special characters
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return strongPasswordRegex.test(password);
  }

  static createUser(req, res) {
    const userData = req.body;

    const requiredFields = [
      'ProfileFor',
      'Name',
      'Gender',
      'DateOfBirth',
      'Age',
      'MaritalStatus',
      'MotherTongue',
      'LanguageKnown',
      'Height',
      'Weight',
      'PhysicalStatus',
      'Hobbies',
      'Interest',
      'CountryCode',
      'MobileNumber',
      'Email',
      'LoginPassword'
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(field => !userData[field]);

    if (missingFields.length > 0) {
      const errorMessage = {};
      missingFields.forEach(field => {
        errorMessage[field] = `${field} field is missing`;
      });

      res.status(400).json({ error: errorMessage });
      return;
    }

    // Check if MobileNumber or Email already exists
    User.getUserByMobileOrEmail(userData.MobileNumber, userData.Email, (err, existingUser) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else if (existingUser) {
        const errorMessages = {};
        if (existingUser.MobileNumber === userData.MobileNumber) {
          errorMessages.MobileNumber = 'Mobile number already exists';
        }
        if (existingUser.Email === userData.Email) {
          errorMessages.Email = 'Email already exists';
        }
        res.status(400).json({ error: errorMessages });
      } else {
        // Check password strength
        if (!UserService.isStrongPassword(userData.LoginPassword)) {
          res.status(400).json({ error: { LoginPassword: 'Password is not strong enough' } });
          return;
        }

        // User does not exist and password is strong, proceed with creating the user
        User.createUser(userData, (err, results) => {
          if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            const userId = results.insertId; // Get the last inserted ID
            
            // Generate JWT token for the newly created user
            const token = jwt.sign({ userId, email: userData.Email }, process.env.JWT_SECRET, { expiresIn: '4h' });
            
            res.status(201).json({ message: 'User created successfully', userId, token });
          }
        });
      }
    });
  }

  static getUserById(req, res) {
    const userId = req.params.id;

    User.getUserById(userId, (err, user) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        } else {
          res.status(200).json(user);
        }
      }
    });
  }

  static updateUser(req, res) {
    const userId = req.params.id;
    const userData = req.body;

    User.updateUser(userId, userData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'User updated successfully' });
      }
    });
  }

  static deleteUser(req, res) {
    const userId = req.params.id;

    User.deleteUser(userId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'User deleted successfully' });
      }
    });
  }

  static loginUser(req, res) {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Authenticate user
    User.authenticateUser(email, password, (err, user) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else if (!user) {
        res.status(401).json({ message: 'Incorrect email or password' });
      } else {
        // User authenticated, create JWT token
        const token = jwt.sign({ email: user.Email, role: user.Role }, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Login successful', token });
      }
    });
  }

//######

static loginUser(req, res) {
  const { Email, LoginPassword } = req.body;

  // Check if email and password are provided
  if (!Email || !LoginPassword) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Authenticate user by email
  User.getUserByEmailOrMobile(Email, (err, user) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else if (!user) {
      res.status(401).json({ message: 'Incorrect email or mobile number' });
    } else {
      // Compare hashed password with plaintext password
      bcrypt.compare(LoginPassword, user.LoginPassword, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          res.status(500).json({ message: 'Internal Server Error' });
        } else if (isMatch) {
          // Passwords match, generate JWT token
          const token = jwt.sign({ userId: user.UserID, email: user.Email }, process.env.JWT_SECRET, { expiresIn: '4h' });

          // Create login audit log
          User.createLoginAudit(user.UserID, req.ip, req.headers['user-agent'], (err, _) => {
            if (err) {
              console.error('Error creating login audit log:', err);
            }
          });

          res.status(200).json({ message: 'Login successful', token });
        } else {
          // Passwords don't match
          res.status(401).json({ message: 'Incorrect password' });
        }
      });
    }
  });
}

static logoutUser(req, res) {
  // Get user ID from JWT payload
  const userId = req.user.userId;

  // Create logout audit log
  User.createLogoutAudit(userId, (err, _) => {
    if (err) {
      console.error('Error creating logout audit log:', err);
    }
  });

  // Instead of generating a new token, you can simply respond with a success message
  res.status(200).json({ message: 'Logout successful' });
}


}

module.exports = UserService;
