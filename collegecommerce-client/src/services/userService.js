const USER_API_URL = "http://localhost:8080/api/user";

export async function findByUserName(username) {
    const response = await fetch(`${USER_API_URL}/${username}`);
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject();
    }
}

export async function createAccount(user) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    };

    const response = await fetch(USER_API_URL, init);
    if (response.ok) {
        const user = await response.json();
        return user;
    } else if (response.status === 400) {
        const errs = await response.json();
        return Promise.reject(errs);
    } else {
        return Promise.reject();
    }
}

export async function update(user) {

    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("collegeCommerceToken")}`
        },
        body: JSON.stringify(user)
    };

    const response = await fetch(`${USER_API_URL}/${user.userId}`, init);
    if (response.ok) {
        return Promise.resolve();
    } else if (response.status === 400) {
        const errs = await response.json();
        return Promise.reject(errs);
    } else {
        return Promise.reject();
    }
}


export async function deleteById(userId) {
    const init = { 
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("collegeCommerceToken")}`
        }
    };
    const response = await fetch(`${USER_API_URL}/${userId}`, init);
    if (response.ok) {
        return Promise.resolve();
    } else {
        return Promise.reject();
    }
}