import { createAuthHeaders } from '../API/userManager';

const baseUrl = '/api/v1';

export const getReferenceTypes = () => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/referenceTypes`, {
        headers: authHeader
    })
    .then(response => response.json())
};

export const getReferences = () => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/references`, {
        headers: authHeader
    })
    .then(response => response.json())
};

export const getReferenceById = (id) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/references/${id}`, {
        headers: authHeader
    })
    .then(response => response.json())
}

export const createReference = (reference) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/references/create`, {
        headers: authHeader,
        method: 'POST',
        body: JSON.stringify(reference)
    })
    .then(response => response.json())
}

export const editReference = (id, reference) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/references/edit/${id}`, {
        headers: authHeader,
        method: 'PUT',
        body: JSON.stringify(reference)
    })
}

export const deleteReference = (id) => {
    const authHeader = createAuthHeaders()
    return fetch(`${baseUrl}/references/delete/${id}`, {
        headers: authHeader,
        method: 'DELETE'
    }
)
}