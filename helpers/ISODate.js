export default date => (date ? new Date(date).toISOString() : new Date().toISOString());
