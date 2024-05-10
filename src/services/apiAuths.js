export const BASE_URL = "http://localhost:8000"

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


export async function updateKeepLoggedIn(payload){
    const jsonFormData = {"keep_logged_in": payload.value};
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

export async function getUserProfile(){
    const token = localStorage.getItem("access")
    try {
        const response = await fetch(`${BASE_URL}/api/v1/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const jsonData = await response.json()
        return { data: jsonData, status: response.status }

    } catch (error) {
        console.error('Error submitting form data:', error);
    }
}