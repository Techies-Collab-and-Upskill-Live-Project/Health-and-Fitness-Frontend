import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const SECRET = import.meta.env.VITE_SECRET;

export const encrypt = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(data, SECRET).toString();
  return encryptedData;
};

export const decrypt = (encryptedData) => {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, SECRET).toString(
    CryptoJS.enc.Utf8
  );
  return decryptedData;
};

export const formatDate = (date) => {
  const today = new Date();

  const isToday = date.toDateString() === today.toDateString();
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const formattedDate = `${day} ${month}`;
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

  if (isToday) {
    return `Today, ${formattedDate}`;
  } else {
    return `${dayName}, ${formattedDate}`;
  }
};

export function formatToBackendDate(date) {
  const pad = (num) => num.toString().padStart(2, "0");

  const formattedDate = `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}`;

  return formattedDate;
}

export function roundUp(value) {
  return Math.ceil(value);
}

export function reduceObjectsAttr(data, attr) {
  return data.reduce((accumulator, currentObject) => {
    return accumulator + roundUp(currentObject[attr]);
  }, 0);
}

export function getCookie(name) {
  console.log(Cookies.get());
  return Cookies.get(name);
}

export function capitalizeFirstLetter(string) {
  if (!string) return string; // handle empty strings
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function changeFirstLetterToLower(string) {
  if (!string) return string; // handle empty strings
  return string.charAt(0).toLowerCase() + string.slice(1);
}


export function getWeekNumber(date) {
  // Create a new date object for the first day of the year
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  // Calculate the number of days between the current date and the start of the year
  const daysDifference = Math.floor(
    (date - startOfYear) / (24 * 60 * 60 * 1000)
  );
  // Calculate the week number (ISO 8601 week starts on Monday)
  const weekNumber = Math.ceil((daysDifference + startOfYear.getDay() + 1) / 7);
  return weekNumber;
}
