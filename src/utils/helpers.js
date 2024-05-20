import CryptoJS from 'crypto-js';

const SECRET = import.meta.env.VITE_SECRET


export const encrypt = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(data, SECRET).toString();
    return encryptedData
};


export const decrypt = (encryptedData) => {

    const decryptedData = CryptoJS.AES.decrypt(encryptedData, SECRET).toString(CryptoJS.enc.Utf8);
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