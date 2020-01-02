import { createAuthHeaders } from '../API/userManager';

const baseUrl = "/api/v1"
const authHeader = createAuthHeaders();
export default {

//All methods that fetch the book data, with varying parameters and/or methods

    getAllBooks() {       
        return fetch(`${baseUrl}/books}`, {
            headers: authHeader
        })
        .then(response => response.json());
    },    
    getBook(id) {       
        return fetch(`${baseUrl}/books/${id}`, {
            headers: authHeader
        })
            .then(response => response.json());
    },
    postBook(book) {
        return fetch(`${baseUrl}/books`, {
            headers: authHeader,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        }).then(response => response.json())
    },
    editBook(editedBook) {
        return fetch (`${baseUrl}/books/${editedBook.id}`,  {
            headers: authHeader,
            method: "PUT",
            body: JSON.stringify(editedBook)
        }).then(response => response.json());
    },
    deleteBook(id) {
        return fetch(`${baseUrl}/books/${id}`, {
            headers: authHeader,
            method: "DELETE"
        }).then(response => response.json())
    }
}