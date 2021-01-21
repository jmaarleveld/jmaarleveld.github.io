let numbers = [];

function nextNumber() {
    let number = generateRandom();
    document.getElementById("big-num-text").innerText = number;
    numbers.push(number);
    // Now, populate the
    document.getElementById("list-text").innerText = makeText();
}

function generateRandom() {
    return Math.floor(Math.random() * 61).toString();
}

function makeText() {
    return numbers.slice(0, numbers.length - 1).join(", ");
}