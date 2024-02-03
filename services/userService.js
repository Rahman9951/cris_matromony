// services/userService.js
const User = require('../models/userModel');

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
            res.status(201).json({ message: 'User created successfully', userId });
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
}

module.exports = UserService;
