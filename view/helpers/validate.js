/**
 * Validate value of field for registration or login
 * @param fieldName
 * @param value
 * @returns {string}
 */

export default function validateField(fieldName, value) {
  switch (fieldName) {
    case 'email':
      return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '' : 'Invalid email format';
    case 'password':
      return (value.length >= 6) ? '' : "Password haven't to be less then 6 characters";
    default:
      return null;
  }
}
