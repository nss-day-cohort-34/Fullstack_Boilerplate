import { getWords } from '../../../API/wordManager';

let words = []

export const getSuggestions = value => {
    return getWords().then(word => {
        words.push(word)
    })
        .then(() => {
            console.log(words)
            const inputValue = value.trim().toLowerCase();
            const inputLength = inputValue.length;
            const filteredWords = words[0].filter(word => word.name.toLowerCase().slice(0, inputLength) === inputValue);
            const filteredWordNames = filteredWords.map(word => {
                return word.name
            });
            console.log(filteredWordNames)
            return inputLength === 0 ? [] : filteredWordNames
        })
};