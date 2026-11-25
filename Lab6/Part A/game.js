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

// Function to randomly generate computer choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Function to play a single round
function playRound(playerChoice) {
    // Check if game has started
    if (!gameStarted) {
        alert("Please enter your name and click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();
    roundCount++;

    // Update images in the arena
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    let outcome = "";
    const resultElement = document.getElementById("result");

    // Determine the winner
    if (playerChoice === computerChoice) {
        draws++;
        outcome = "Draw";
        resultElement.innerHTML = "It's a Draw! Both chose " + playerChoice + ".";
        resultElement.style.color = "orange";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        wins++;
        outcome = "Win";
        resultElement.innerHTML = "You Win! " + playerChoice + " beats " + computerChoice + ".";
        resultElement.style.color = "green";
    } else {
        losses++;
        outcome = "Loss";
        resultElement.innerHTML = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
        resultElement.style.color = "red";
    }

    // Store outcome in results array
    results.push(outcome);

    // Update scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Append new row to history table
    const historyBody = document.getElementById("historyBody");
    const newRow = "<tr>" +
        "<td>" + roundCount + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + outcome + "</td>" +
        "</tr>";
    historyBody.innerHTML += newRow;
}

// Function to display match summary
function showSummary() {
    const totalGames = results.length;

    if (totalGames === 0) {
        document.getElementById("summaryText").innerHTML = "No rounds played yet.";
        return;
    }

    const winRate = ((wins / totalGames) * 100).toFixed(1);
    const currentName = document.getElementById("playerName").value.trim();

    document.getElementById("summaryText").innerHTML =
        "Player: " + currentName + " | Total Rounds: " + totalGames +
        " | Wins: " + wins + " | Losses: " + losses + " | Draws: " + draws +
        " | Win Rate: " + winRate + "%";
}

// Function to reset the entire game including player name
function resetGame() {
    gameStarted = false;
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    // Clear player name, welcome message, and start time
    document.getElementById("playerName").value = "";
    document.getElementById("welcomeMsg").innerHTML = "";
    document.getElementById("startTime").innerHTML = "";

    // Reset scoreboard, result text, summary, and history table
    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";
    document.getElementById("historyBody").innerHTML = "";

    // Reset images to default rock.png
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}