const LISTING_API_URL = "http://localhost:8080/api/listing";

export async function findAllListings() {
    const response = await fetch(LISTING_API_URL);
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject();
    }
}

export async function findById(listingId) {
    const response = await fetch(`${LISTING_API_URL}/${listingId}`);
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject();
    }
}

async function add(listing) {

    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getListing("collegeCommerceToken")}`
        },
        body: JSON.stringify(listing)
    };

    const response = await fetch(LISTING_API_URL, init);
    if (response.ok) {
        return Promise.resolve();
    } else if (response.status === 400) {
        const errs = await response.json();
        return Promise.reject(errs);
    } else {
        return Promise.reject();
    }
}

async function update(listing) {

    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getListing("collegeCommerceToken")}`
        },
        body: JSON.stringify(listing)
    };

    const response = await fetch(`${LISTING_API_URL}/${listing.listingId}`, init);
    if (response.ok) {
        return Promise.resolve();
    } else if (response.status === 400) {
        const errs = await response.json();
        return Promise.reject(errs);
    } else {
        return Promise.reject();
    }
}

export async function save(listing) {
    return listing.listingId > 0 ? update(listing) : add(listing);
}

export async function deleteById(listingId) {
    const init = { 
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getListing("collegeCommerceToken")}`
        }
    };
    const response = await fetch(`${LISTING_API_URL}/${listingId}`, init);
    if (response.ok) {
        return Promise.resolve();
    } else {
        return Promise.reject();
    }
} 