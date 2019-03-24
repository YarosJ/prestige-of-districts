/**
 * Validate value of field for registration or login
 * @param fieldName
 * @param value
 * @returns {string}
 */

export default function validateField(fieldName, value) {
  switch (fieldName) {
    case 'email':
      const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      return emailValid ? '' : 'Invalid email format';
    case 'password':
      const passwordValid = value.length >= 6;
      return passwordValid ? '' : "Password haven't to be less then 6 characters";
    default:
      break;
  }
}
