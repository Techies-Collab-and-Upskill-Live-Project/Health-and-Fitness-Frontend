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
