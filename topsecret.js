/*jshint esversion: 6 */

const cipherLogo = `
C̶a̶e̶s̶a̶r̶ C̶i̶p̶h̶e̶r̶ C̶r̶y̶p̶t̶o̶g̶r̶a̶p̶h̶y̶
🅲🅰🅴🆂🅰🆁 🅲🅸🅿🅷🅴🆁 🅲🆁🆈🅿🆃🅾🅶🆁🅰🅿🅷🆈
143 162 171 160 164 157 147 162 141 160 150 171
`;

const MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', '.': '.', '!': '-.-',
    '?': '..--', ';': '.-', ',': '-', ' ': '/'
};

const NATO_CODE_DICT = {
    'A': 'Alfa', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo', 'F': 'Foxtrot', 'G': 'Golf',
    'H': 'Hotel', 'I': 'India', 'J': 'Juliet', 'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'Nobody',
    'O': 'Oscar', 'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango', 'U': 'Uniform',
    'V': 'Victor', 'W': 'White', 'X': 'X-ray', 'Y': 'Yankee', 'Z': 'Zulu', '1': 'One', '2': 'Two',
    '3': 'Three', '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine',
    '0': 'Zero', '.': 'Period', '!': 'Exclamation', '?': 'Question', ';': 'Semicolon', ',': 'Comma',
    '-': 'Hyphen', ' ': 'Space'
};

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function caesarCipher(text, shift, mode) {
    try {
        if (typeof text !== 'string') throw new Error("Text must be a string.");
        shift = parseInt(shift);
        if (isNaN(shift) || shift < 0) throw new Error("Shift must be a positive integer.");
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        shift = mode === "encode" ? shift % 26 : -shift % 26;
        return text.toUpperCase().split('').map(char => {
            const idx = alphabet.indexOf(char);
            if (idx === -1) return char;
            return alphabet[(idx + shift + 26) % 26];
        }).join('');
    } catch (e) {
        return `Error in Caesar Cipher: ${e.message}`;
    }
}

// Start of: Matrix cipher
// ==================== MATRIX CIPHER - FINAL WORKING VERSION ====================


function matrixInverse(matrix) {
    const [[a, b], [c, d]] = matrix;
    const det = a * d - b * c;
    if (Math.abs(det) < 1e-9) throw new Error("Matrix is singular");
    const invDet = 1 / det;
    return [
        [Math.round(d * invDet * 100000) / 100000, Math.round(-b * invDet * 100000) / 100000],
        [Math.round(-c * invDet * 100000) / 100000, Math.round(a * invDet * 100000) / 100000]
    ];
}

function generateMatrix(shift) {
    const s = parseInt(shift) || 3;
    const hash = (s * 1103515245 + 12345) % 2147483647;
    const a = (hash % 89) + 5;
    const b = ((hash * 17) % 97) + 3;
    const c = ((hash * 31) % 83) + 7;
    const d = ((hash * 7) % 79) + 4;
    return [[a, b], [c, d]];
}

function matrixCipher(text, shift, mode) {
    try {
        if (typeof text !== 'string' || text.length === 0) 
            throw new Error("Text must be non-empty.");

        shift = parseInt(shift);
        if (isNaN(shift) || shift < 1) 
            throw new Error("Shift must be positive integer.");

        if (mode === "encode") {
            const encodeMatrix = generateMatrix(shift);

            let shifted = text.split('').map(c => c.charCodeAt(0) + shift);
            if (shifted.length % 2 !== 0) shifted.push(46);

            const encoded = [];
            for (let i = 0; i < shifted.length; i += 2) {
                const x = shifted[i];
                const y = shifted[i + 1];
                encoded.push(
                    Math.round(x * encodeMatrix[0][0] + y * encodeMatrix[0][1]),
                    Math.round(x * encodeMatrix[1][0] + y * encodeMatrix[1][1])
                );
            }

            return encoded.join(',');           // ← Minimal output (just numbers)
        } 
        else { // decode
            let input = text.trim().replace(/\s/g, ''); // clean spaces

            // IMPORTANT: User must set the same Shift value in the input box for decode
            const numbers = input.split(',').map(n => parseFloat(n));

            if (numbers.length % 2 !== 0 || numbers.some(isNaN)) 
                throw new Error("Corrupted data. Copy all numbers and set correct Shift.");

            const encodeMatrix = generateMatrix(shift);   // uses the Shift box
            const decodeMatrix = matrixInverse(encodeMatrix);

            let decoded = '';
            for (let i = 0; i < numbers.length; i += 2) {
                const x = numbers[i];
                const y = numbers[i + 1];
                const origX = Math.round(x * decodeMatrix[0][0] + y * decodeMatrix[0][1]);
                const origY = Math.round(x * decodeMatrix[1][0] + y * decodeMatrix[1][1]);
                decoded += String.fromCharCode(origX) + String.fromCharCode(origY);
            }

            return decoded.replace(/\./g, '')
                          .split('')
                          .map(c => String.fromCharCode(c.charCodeAt(0) - shift))
                          .join('');
        }
    } catch (e) {
        console.error(e);
        return `Error in Matrix Cipher: ${e.message}`;
    }
}






function separateMorse(text) {
    const keys = Object.keys(MORSE_CODE_DICT);
    const vals = Object.values(MORSE_CODE_DICT);
    let morse = '', normal = '', spaceFound = 0;
    for (let char of text.trim() + ' ') {
        if (char !== ' ') {
            morse += char;
            spaceFound = 0;
        } else if (morse) {
            spaceFound++;
            if (spaceFound === 1) {
                const idx = vals.indexOf(morse);
                normal += (idx !== -1 ? keys[idx] : '?');
                morse = '';
            } else if (spaceFound === 2) {
                normal += ' ';
            }
        }
    }
    if (morse) {
        const idx = vals.indexOf(morse);
        normal += (idx !== -1 ? keys[idx] : '?');
    }
    return normal.trim();
}
// function separateMorse(text) {
//     const keys = Object.keys(MORSE_CODE_DICT);
//     const vals = Object.values(MORSE_CODE_DICT);
//     let morse = '', normal = '', spaceFound = 0;
//     for (let char of text.trim() + ' ') {
//         if (char !== ' ') {
//             morse += char;
//             spaceFound = 0;
//         } else if (morse) {
//             spaceFound++;
//             if (spaceFound === 1) {
//                 const idx = vals.indexOf(morse);
//                 normal += (morse === '.--') ? '?' : (idx !== -1 ? keys[idx] : '?');
//                 morse = '';
//             } else if (spaceFound === 2) {
//                 normal += ' ';
//             }
//         }
//     }
//     if (morse) {
//         const idx = vals.indexOf(morse);
//         normal += (morse === '.--') ? '?' : (idx !== -1 ? keys[idx] : '?');
//     }
//     return normal.trim();
// }



function morseCode(text, mode) {
    try {
        if (typeof text !== 'string') throw new Error("Text must be a string.");
        if (mode === "encode") {
            return text.toUpperCase().split('').map(char => MORSE_CODE_DICT[char] || char).join(' ');
        } else {
            return separateMorse(text);
        }
    } catch (e) {
        return `Error in Morse Code: ${e.message}`;
    }
}

function natoAlphabet(text, mode) {
    try {
        if (typeof text !== 'string') throw new Error("Text must be a string.");
        if (mode === "encode") {
            return text.toUpperCase().split('').map(char => NATO_CODE_DICT[char] || char).join(' ');
        } else {
            const reverseDict = Object.fromEntries(Object.entries(NATO_CODE_DICT).map(([k, v]) => [v.toUpperCase(), k]));
            return text.split(' ').map(word => reverseDict[word.toUpperCase()] || '?').join('');
        }
    } catch (e) {
        return `Error in NATO Alphabet: ${e.message}`;
    }
}

function binaryCode(text, mode) {
    try {
        if (typeof text !== 'string') throw new Error("Text must be a string.");
        if (mode === "encode") {
            return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        } else {
            return text.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        }
    } catch (e) {
        return `Error in Binary Code: ${e.message}`;
    }
}

function base64Cipher(text, mode) {
    try {
        if (typeof text !== 'string') throw new Error("Text must be a string.");
        if (mode === "encode") {
            return btoa(text);
        } else {
            return atob(text);
        }
    } catch (e) {
        return `Error in Base64: ${e.message}`;
    }
}

// Clear and Copy Functionality
const clear = document.querySelector(".clear")
function clearMessageField() {
       const message_field = document.querySelector(".message");
       message_field.value = ''
}

document.querySelectorAll('.copy').forEach(button => {
    button.addEventListener('click', async () => {
        const input = document.querySelector('input[name="text"]');
        const result = document.getElementById('result');
        const resultText = result.textContent.replace('Result: ', '');

        try {
            const textToCopy = button.closest('div').contains(input) ? input.value : resultText;
            await navigator.clipboard.writeText(textToCopy);
            button.style.background = '#ff6200'; // Visual feedback
            setTimeout(() => button.style.background = '#222', 500);
        } catch (err) {
            console.error('Clipboard error:', err);
        }
    });
});

document.getElementById("cipher-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const text = form.text.value;
    const cipher = form.cipher.value;
    const mode = form.mode.value;
    const shift = form.shift.value;

    const ciphers = {
        "caesar": caesarCipher,
        "matrix": matrixCipher,
        "morse": morseCode,
        "nato": natoAlphabet,
        "binary": binaryCode,
        "base64": base64Cipher
    };

    const result = (cipher === "caesar" || cipher === "matrix")
        ? ciphers[cipher](text, shift, mode)
        : ciphers[cipher](text, mode);
    document.getElementById("result").textContent = `Result: ${result}`;
});

document.getElementById("logo").textContent = cipherLogo;
