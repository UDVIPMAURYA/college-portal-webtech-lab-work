// cli.js — A multi-purpose command-line utility built with Node.js.
// Supports three commands: uppercase, factorial, and password.
// Usage:
//   node cli.js uppercase <text>
//   node cli.js factorial <number>
//   node cli.js password <length>

const command = process.argv[2];
const argument = process.argv[3];

function toUppercase(text) {
    return text.toUpperCase();
}

function calculateFactorial(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    // 170! is the largest factorial JS's Number type can represent
    // without overflowing to Infinity. Anything beyond that is rejected
    // rather than silently producing a meaningless (or hanging) result.
    if (n > 170) {
        throw new Error("Number too large — factorial supports values up to 170.");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result = result * i;
    }
    return result;
}

function generatePassword(length) {
    // Cap the length to a sane maximum to prevent runaway memory usage
    // from malformed or malicious input.
    if (length <= 0 || length > 128) {
        throw new Error("Password length must be between 1 and 128.");
    }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}

switch (command) {
    case "uppercase":
        if (!argument) {
            console.log("Usage: node cli.js uppercase <text>");
            break;
        }
        console.log(toUppercase(argument));
        break;

    case "factorial":
        if (!argument || isNaN(argument)) {
            console.log("Usage: node cli.js factorial <number>");
            break;
        }
        try {
            console.log(calculateFactorial(Number(argument)));
        } catch (err) {
            console.log("Error: " + err.message);
        }
        break;

    case "password":
        const length = argument ? Number(argument) : 12;
        try {
            console.log(generatePassword(length));
        } catch (err) {
            console.log("Error: " + err.message);
        }
        break;

    default:
        console.log("Unknown command. Available commands: uppercase, factorial, password");
}