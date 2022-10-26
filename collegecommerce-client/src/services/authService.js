const API_URL = "http://localhost:8080";

export async function authenticate(user) {

    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    };

    const response = await fetch(`${API_URL}/authenticate`, init);
    if (response.ok) {
        const {jwt_token} = await response.json();
        return jwt_token;
    } else {
        return Promise.reject();
    }
}