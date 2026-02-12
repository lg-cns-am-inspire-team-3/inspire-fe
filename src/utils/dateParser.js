function getYearFromDateTime(dateTime) {
  return dateTime.substring(0, 4);
}
function getMonthFromDateTime(dateTime) {
  return parseInt(dateTime.substring(5, 7)).toString();
}
function getDayFromDateTime(dateTime) {
  return dateTime.substring(8, 10);
}

export default {
    getYearFromDateTime,
    getMonthFromDateTime,
    getDayFromDateTime
};