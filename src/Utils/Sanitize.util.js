const sanitizeText = (string, space=false) => {
    if (!space) 
        return string.replace(/[^a-zA-Z0-9 ]/g, "");

    return string.replace(/[^a-zA-Z0-9]/g, "");
};

const textRegex = (name) => {
    let username = sanitizeText(name);
    return new RegExp(username);
}

exports.sanitizeText = sanitizeText;
exports.textRegex = textRegex;