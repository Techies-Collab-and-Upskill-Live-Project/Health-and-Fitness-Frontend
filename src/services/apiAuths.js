import { decrypt } from "../utils/helpers";

export const BASE_URL = import.meta.env.VITE_BASE_URL

export async function registerUser(formData) {
    const jsonFormData = {};
    formData.forEach((value, key) => {
        jsonFormData[key] = value;
    });
    formData["keep_logged_in"] = false
    const jsonString = JSON.stringify(jsonFormData);
    try {
        const response = await fetch(`${BASE_URL}/auth/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        });
        const jsonData = await response.json()

        if (response.status == 201) {
            return { data: jsonData, status: response.status }
        }
        else if (response.status == 400) {
            return { data: jsonData, status: response.status }
        }
    } catch (error) {
        console.error('Error submitting form data:', error);
        throw new Error("Failed to register user, please try again")
    }
}


export async function logInUser(formData) {
    const jsonFormData = {};
    formData.forEach((value, key) => {
        jsonFormData[key] = value;
    });
    const jsonString = JSON.stringify(jsonFormData);
    try {
        const response = await fetch(`${BASE_URL}/auth/jwt/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        });
        const jsonData = await response.json()

        if (response.status == 200) {
            return { data: jsonData, status: response.status }
        }
        else {
            return { data: jsonData, status: response.status }
        }
    } catch (error) {
        console.error('Error submitting form data:', error);
        throw new Error("Failed to log user in, please try again")
    }
}


export async function updateKeepLoggedIn(payload) {
    const jsonFormData = { "keep_logged_in": payload.value };
    const jsonString = JSON.stringify(jsonFormData);

    try {
        const response = await fetch(`${BASE_URL}/auth/users/me/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${payload.token}`
            },
            body: jsonString
        });
        return response.status
    } catch (error) {
        console.error('Error submitting form data:', error);
    }
}

export async function getUserProfile() {
    const token = decrypt(localStorage.getItem("access"))
    try {
        const response = await fetch(`${BASE_URL}/api/v1/profile/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const jsonData = await response.json()
        return { data: jsonData, status: response.status }

    } catch (error) {
        console.log('Error fetching profile:', error);
    }
}

export async function getOTP(email) {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/auth/users/otp/?email=${email}`, {
            method: 'GET'
        });
        const jsonData = await response.json()
        return { data: jsonData, status: response.status }

    } catch (error) {
        console.log('Error requesting OTP:', error);
    }
}

export async function getUserID() {
    const token = decrypt(localStorage.getItem("access"))
    try {
        const response = await fetch(`${BASE_URL}/auth/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const jsonData = await response.json()
        return { data: jsonData, status: response.status }

    } catch (error) {
        console.log('Error fetching user details:', error);
    }
}

export async function verifyOTP(jsonData) {
    const jsonString = JSON.stringify(jsonData);
    try {
        const response = await fetch(`${BASE_URL}/api/v1/auth/users/otp/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        });
        const resData = await response.json()
        return { data: resData, status: response.status }

    } catch (error) {
        console.log('Error verifying user"s OTP:', error);
    }
}

export async function resetPassword(jsonData, userID) {
    const jsonString = JSON.stringify(jsonData);
    try {
        const response = await fetch(`${BASE_URL}/api/v1/auth/users/${userID}/set_password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        });
        const resData = await response.json()
        return { data: resData, status: response.status }

    } catch (error) {
        console.log('Error Setting new password:', error);
    }
}