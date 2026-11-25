// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Function to start the game
function startGame() {
    const nameInput = document.getElementById("playerName").value.trim();

    // Check if name is empty
    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    // Display welcome message and start date/time
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + nameInput + "!";
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
    gameStarted = true;
}

// Function to generate random computer choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Function to play one round
function playRound(playerChoice) {
    // Ensure game has started first
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();
    roundCount++;

    // Update images based on choices
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    let roundResult = "";
    const resultElement = document.getElementById("result");

    // Determine winner using if...else
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        resultElement.innerHTML = "It's a Draw!";
        resultElement.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        resultElement.innerHTML = "You Win!";
        resultElement.style.color = "green";
    } else {
        roundResult = "Lose";
        losses++;
        resultElement.innerHTML = "You Lose!";
        resultElement.style.color = "red";
    }

    // Store result in array and update scoreboard
    results.push(roundResult);
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Add new row to history table using innerHTML +=
    const historyBody = document.getElementById("historyBody");
    historyBody.innerHTML += 
        "<tr>" +
            "<td>" + roundCount + "</td>" +
            "<td>" + playerChoice + "</td>" +
            "<td>" + computerChoice + "</td>" +
            "<td>" + roundResult + "</td>" +
        "</tr>";
}

// Function to calculate and display game summary
function showSummary() {
    if (results.length === 0) {
        document.getElementById("summaryText").innerHTML = "No rounds played yet.";
        return;
    }

    // Use a for loop over results array to count wins
    let totalWins = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            totalWins++;
        }
    }

    const totalRounds = results.length;
    const winPercentage = Math.round((totalWins / totalRounds) * 100);

    document.getElementById("summaryText").innerHTML = 
        "You played " + totalRounds + " rounds and won " + winPercentage + "%.";
}

// Function to reset the game back to initial state
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    // Update UI back to 0 and clear messages/history
    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}