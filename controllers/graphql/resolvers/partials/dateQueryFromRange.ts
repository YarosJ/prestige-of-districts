
export default dateRange => (dateRange ? {
  $lt: new Date(dateRange.maxDate).toISOString(),
  $gt: new Date(dateRange.minDate).toISOString(),
} : { $type: 'date' });
