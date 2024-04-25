const formatString = string => {
    string = string.split(' ');

    let removeSpaces = string.filter(element => {
        return element !== '';
    });

    let preformatted = removeSpaces.join('').toLowerCase();
    let formattedString = '';

    for (let i = 0; i < preformatted.length; i++) {
        if (i === 0 || i % 2 === 0) {
            formattedString += preformatted[i].toUpperCase();
        } else {
            formattedString += preformatted[i].toLowerCase();
        }                                                           
    }                                                           

    return formattedString;
}

console.log(formatString('vai  se fODEr '));

