function encrypt() {
    let plaintext = document.getElementById("plaintext").value;
    let shift = parseInt(document.getElementById("shift").value);
    let encryptedText = caesarCipher(plaintext, shift);
    document.getElementById("encryptedText").textContent = encryptedText;
}

function reset() {
    document.getElementById("plaintext").value = '';
    document.getElementById("shift").value = '';
    document.getElementById("encryptedText").textContent = '';
}

function caesarCipher(str, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    shift = shift % 26;
    let encrypted = '';

    for (let char of str) {
        if (alphabet.includes(char)) {
            let newIndex = (alphabet.indexOf(char) + shift) % 26;
            encrypted += alphabet[newIndex];
        } else {
            encrypted += char;
        }
    }

    return encrypted;
}