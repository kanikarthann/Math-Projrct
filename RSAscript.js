function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function modInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;
    if (phi === 1) return 0;
    while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;
        phi = e % phi;
        e = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
}

function encrypt() {
    let p = parseInt(document.getElementById("p-value").value);
    let q = parseInt(document.getElementById("q-value").value);
    let e = parseInt(document.getElementById("e-value").value);
    let message = document.getElementById("message").value;

    if (isNaN(p) || isNaN(q) || isNaN(e) || message === "") {
        alert("Please enter valid p, q, e values and a message.");
        return;
    }

    let n = p * q;
    document.getElementById("n-value").textContent = n;

    let encryptedMessage = [];
    for (let char of message) {
        let encryptedChar = BigInt(char.charCodeAt(0)) ** BigInt(e) % BigInt(n);
        encryptedMessage.push(encryptedChar);
    }

    document.getElementById("encrypted-message").textContent = encryptedMessage.join(" ");
}

function decrypt() {
    let p = parseInt(document.getElementById("p-value").value);
    let q = parseInt(document.getElementById("q-value").value);
    let e = parseInt(document.getElementById("e-value").value);
    let encryptedMessage = document.getElementById("encrypted-message").textContent.split(" ").map(BigInt);

    if (isNaN(p) || isNaN(q) || isNaN(e) || encryptedMessage.length === 0) {
        alert("Please enter valid p, q, e values and encrypt a message first.");
        return;
    }

    let n = p * q;
    let phi = (p - 1) * (q - 1);
    let d = modInverse(e, phi);

    let decryptedMessage = "";
    for (let char of encryptedMessage) {
        let decryptedChar = char ** BigInt(d) % BigInt(n);
        decryptedMessage += String.fromCharCode(Number(decryptedChar));
    }

    document.getElementById("decrypted-message").textContent = decryptedMessage;
}

function reset() {
    document.getElementById("p-value").value = "";
    document.getElementById("q-value").value = "";
    document.getElementById("e-value").value = "";
    document.getElementById("message").value = "";
    document.getElementById("n-value").textContent = "";
    document.getElementById("encrypted-message").textContent = "";
    document.getElementById("decrypted-message").textContent = "";
}
