import {apiToken} from '../apiToken'

export const getWordInformation = word => {
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

export const getAllRhymingWords = word => {
    return fetch(`https://api.datamuse.com/words?rel_rhy=${word}`)
        .then(resp => resp.json())
}
