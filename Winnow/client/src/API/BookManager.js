import { createAuthHeaders } from '../API/userManager';

const baseUrl = "/api/v1"
export default {
    
    //All methods that fetch the book data, with varying parameters and/or methods

    getAllBooks() {       
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/books`, {
            headers: authHeader
        })
        .then(response => response.json())
    },    
    getBook(id) {       
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/books/${id}`, {
            headers: authHeader
        })
        .then(response => response.json())
    },
    postBook(newBook) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/books`, {
            headers: authHeader,
            method: "POST",           
            body: JSON.stringify(newBook)
        }).then(response => response.json())
    },
    editBook(id, editedBook) {
        const authHeader = createAuthHeaders();
        return fetch (`${baseUrl}/books/${id}`, {
            headers: authHeader,
            method: "PUT",
            body: JSON.stringify(editedBook)
        })
    },
    deleteBook(id) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/books/${id}`, {
            headers: authHeader,
            method: "DELETE"
        })
    }
}