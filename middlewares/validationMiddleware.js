// middlewares/validationMiddleware.js
class ValidationMiddleware {
    static validateRegistration(req, res, next) {
      // Add your form validation logic for Registration here
      next();
    }
}

module.exports = ValidationMiddleware;
