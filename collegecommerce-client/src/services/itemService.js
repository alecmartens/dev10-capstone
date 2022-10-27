const ITEM_API_URL = "http://localhost:8080/api/item";

export async function findAll() {
    const response = await fetch(ITEM_API_URL);
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject();
    }
}

export async function findById(itemId) {
    const response = await fetch(`${ITEM_API_URL}/${itemId}`);
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject();
    }
}

async function add(item) {

    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("collegeCommerceToken")}`
        },
        body: JSON.stringify(item)
    };

    const response = await fetch(ITEM_API_URL, init);
    if (response.ok) {
        return Promise.resolve();
    } else if (response.status === 400) {
        const errs = await response.json();
        return Promise.reject(errs);
    } else {
        return Promise.reject();
    }
}

async function update(item) {

    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("collegeCommerceToken")}`
        },
        body: JSON.stringify(item)
    };

    const response = await fetch(`${ITEM_API_URL}/${item.itemId}`, init);
    if (response.ok) {
        return Promise.resolve();
    } else if (response.status === 400) {
        const errs = await response.json();
        return Promise.reject(errs);
    } else {
        return Promise.reject();
    }
}

export async function save(item) {
    return item.itemId > 0 ? update(item) : add(item);
}

export async function deleteById(itemId) {
    const init = { 
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("collegeCommerceToken")}`
        }
    };
    const response = await fetch(`${ITEM_API_URL}/${itemId}`, init);
    if (response.ok) {
        return Promise.resolve();
    } else {
        return Promise.reject();
    }
} 