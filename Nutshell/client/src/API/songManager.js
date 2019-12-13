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

export const createSong = (song) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/songs/create`, {
        headers: authHeader,
        method: 'POST',
        body: JSON.stringify(song)
    })
    .then(response => response.json())
}

export const editSong = (id, song) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/songs/edit/${id}`, {
        headers: authHeader,
        method: 'PUT',
        body: JSON.stringify(song)
    }
)
}

export const deleteSong = (id) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/songs/delete/${id}`, {
        headers: authHeader,
        method: 'DELETE'
    }
)
}
