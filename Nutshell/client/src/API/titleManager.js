import { createAuthHeaders } from '../API/userManager';

const baseUrl = '/api/v1';

export const getTitles = () => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/titles`, {
        headers: authHeader
    })
    .then(response => response.json())
};

export const getTitleById = (id) => {
    return fetch(`${baseUrl}/titles/${id}`)
}
