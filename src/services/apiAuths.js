export async function registerUser(formData) {
    const jsonFormData = {};
    formData.forEach((value, key) => {
        jsonFormData[key] = value;
    });
    formData["keep_logged_in"] = false
    const jsonString = JSON.stringify(jsonFormData);
    try {
        const response = await fetch('http://localhost:8000/auth/users/', {
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