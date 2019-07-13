import moment from "moment";

export const formatDate = dateString => {
  return moment(dateString).format("YY-MM-DD, HH:mm:ss");
};

export const displayValue = value => {
  if (["string", "number"].indexOf(typeof value) < 0) {
    return JSON.stringify(value);
  }
  return value;
};
