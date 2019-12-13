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
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/words/${id}`, {
        headers: authHeader
    })
    .then(response => response.json())
}

export const createWord = (word) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/words/create`, {
        headers: authHeader,
        method: 'POST',
        body: JSON.stringify(word)
    }
)
}

export const editWord = (id, word) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/words/edit/${id}`, {
        headers: authHeader,
        method: 'PUT',
        body: JSON.stringify(word)
    }
)
}