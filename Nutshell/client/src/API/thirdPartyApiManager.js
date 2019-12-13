import {apiToken} from '../apiToken'

export const getDefinition = word => {
    return fetch(`https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${word}`, {
        "headers": {
            "x-rapidapi-host": "lingua-robot.p.rapidapi.com",
            "x-rapidapi-key": apiToken
        }
    })
    .then(response => {
        return response.json()
    })
}
