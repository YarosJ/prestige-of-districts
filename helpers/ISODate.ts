/**
 * Returns date in ISO string
 * @param date - Date in any format which need to be converted
 */

const ISODate = (date): string => (date ? new Date(date).toISOString() : new Date().toISOString());

export default ISODate;
