import { createAuthHeaders } from '../API/userManager';
import { pathToFileURL } from 'url';

const baseUrl = '/api/v1';

export const getSongs = () => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/songs`, {
        headers: authHeader
    })
    .then(response => response.json())
};

export const getSongById = (id) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/songs/${id}`, {
        headers: authHeader
    })
    .then(response => response.json())
}

export const editSong = (id, song) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/songs/edit/${id}`, {
        headers: authHeader,
        method: 'PUT'
    })
    .then(response => response.json())
}
