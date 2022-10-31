
export async function getUniversitiesByName(name) {
    const response = await fetch(`http://universities.hipolabs.com/search?name=${name}&country=United States`);
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject();
    }
}