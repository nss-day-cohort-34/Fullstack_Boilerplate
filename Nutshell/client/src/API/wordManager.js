import { createAuthHeaders } from '../API/userManager';

const baseUrl = '/api/v1';

export const getWords = () => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/words`, {
        headers: authHeader
    })
    .then(response => response.json())
};

export const getWordById = (id) => {
    return fetch(`${baseUrl}/words/${id}`)
}
