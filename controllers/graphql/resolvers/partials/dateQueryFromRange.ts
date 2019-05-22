interface DateQuery {
  $type?: string;
  $lt?: string;
  $gt?: string;
}

/**
 * Returns query by dateRange or
 * for all dates if dateRange not given
 */

const query = (dateRange): DateQuery => (dateRange ? {
  $lt: new Date(dateRange.maxDate).toISOString(),
  $gt: new Date(dateRange.minDate).toISOString(),
} : { $type: 'date' });

export default query;
