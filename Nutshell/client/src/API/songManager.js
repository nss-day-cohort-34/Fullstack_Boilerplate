import { createAuthHeaders } from '../API/userManager';

const baseUrl = '/api/v1';

export const getSongs = () => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/songs`, {
        headers: authHeader
    })
    .then(response => response.json())
};

export const getSongById = (id) => {
    return fetch(`${baseUrl}/songs/${id}`)
}
