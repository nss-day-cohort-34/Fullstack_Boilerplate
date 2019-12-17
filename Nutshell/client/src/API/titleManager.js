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
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/titles/${id}`, {
        headers: authHeader
    })
    .then(response => response.json())
}


export const createTitle = (title) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/titles/create`, {
        headers: authHeader,
        method: 'POST',
        body: JSON.stringify(title)
    })
    .then(response => response.json())
}

export const editTitle = (id, title) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/titles/edit/${id}`, {
        headers: authHeader,
        method: 'PUT',
        body: JSON.stringify(title)
    })
}

export const deleteTitle = (id) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/titles/delete/${id}`, {
        headers: authHeader,
        method: 'DELETE'
    }
)
}
