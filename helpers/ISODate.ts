export default (date): string => (date ? new Date(date).toISOString() : new Date().toISOString());
