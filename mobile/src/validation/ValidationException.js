export default class ValidationException extends Error {
  constructor(validationErrors, message) {
    super(message);
    this.validationErrors = validationErrors;
  }
}
