// utils/timeFormatter.js
const { format } = require('date-fns');

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return format(date, 'dd/MM/yyyy     HH:mm a', { useAdditionalDayOfYearTokens: true });
};

module.exports = { formatTimestamp };
