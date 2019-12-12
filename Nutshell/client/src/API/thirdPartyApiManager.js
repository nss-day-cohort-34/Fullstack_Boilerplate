
export const getDefinition = word => {
    return fetch(`https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${word}`, {
        "headers": {
            "x-rapidapi-host": "lingua-robot.p.rapidapi.com",
            "x-rapidapi-key": "b4f9e5dc3fmshc8d2ea31a67a787p10756ajsn5ed96fc106a5"
        }
    })
    .then(response => {
        return response.json()
    })
}
