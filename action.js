let numbers = [];
let queue = [];

function initQueue() {
    for (let i = 1; i < 60; i++) {
        queue.push(i);
    }
}

function nextNumber() {
    if (queue.length === 0) {
        alert("Geen getallen meer over");
        return;
    }
    let number = generateRandom();
    document.getElementById("big-num-text").innerText = number;
    numbers.push(number);
    // Now, populate the
    document.getElementById("list-text").innerText = makeText();
}

function generateRandom() {
    // Generate a random index
    let index = Math.floor(Math.random() * queue.length);
    let value = queue[index];
    queue.splice(index, 1);
    return value;
}

function makeText() {
    return numbers.slice(0, numbers.length - 1).join(", ");
}