const SERVICE_API_URL = "http://localhost:8080/api/service";

export async function findAll() {
    const response = await fetch(SERVICE_API_URL);
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject();
    }
}

export async function findById(serviceId) {
    const response = await fetch(`${SERVICE_API_URL}/${serviceId}`);
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject();
    }
}

export async function findAllByLocation() {
    
}

async function add(service) { 
    console.log(service); 
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("collegeCommerceToken")}`
        },
        body: JSON.stringify(service)
    };
    const response = await fetch(SERVICE_API_URL, init);
    if (response.ok) {
        return Promise.resolve();
    } else if (response.status === 400) {
        const errs = await response.json();
        return Promise.reject(errs);
    } else {
        return Promise.reject();
    }
}

async function update(service) {

    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("collegeCommerceToken")}`
        },
        body: JSON.stringify(service)
    };

    const response = await fetch(`${SERVICE_API_URL}/${service.serviceId}`, init);
    if (response.ok) {
        return Promise.resolve();
    } else if (response.status === 400) {
        const errs = await response.json();
        return Promise.reject(errs);
    } else {
        return Promise.reject();
    }
}

export async function save(service) {
    return service.serviceId > 0 ? update(service) : add(service);
}

export async function deleteById(serviceId) {
    const init = { 
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("collegeCommerceToken")}`
        }
    };
    const response = await fetch(`${SERVICE_API_URL}/${serviceId}`, init);
    if (response.ok) {
        return Promise.resolve();
    } else {
        return Promise.reject();
    }
}