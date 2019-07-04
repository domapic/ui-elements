import moment from 'moment';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var formatDate = function formatDate(dateString) {
  console.log(dateString);
  return moment(dateString).format("YY-MM-DD, HH:mm:ss");
};
var displayValue = function displayValue(value) {
  if (["string", "number"].indexOf(_typeof(value)) < 0) {
    return JSON.stringify(value);
  }

  return value;
};

export { displayValue, formatDate };
