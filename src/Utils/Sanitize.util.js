const sanitizeText = (string) => {
    return string.replace(/[^a-zA-Z0-9]/g, "");
};

const sanitizeNumber = (number) => {
    return number.replace(/[^0-9]/g, "");
}

const textRegex = (name) => {
    let username = sanitizeText(name);
    return new RegExp(`\\b\\w*${username}\\w*\\b`, "gi");
}

const isEmpty = (string) => {
    return string === null || string === undefined || string === "" || string.length === 0 || string.trim().length === 0;
}

exports.sanitizeText = sanitizeText;
exports.textRegex = textRegex;
exports.isEmpty = isEmpty;
exports.sanitizeNumber = sanitizeNumber;