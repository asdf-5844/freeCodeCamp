// Get DOM elements for displaying team info and player details
const teamName = document.getElementById("team");
const typeOfSport = document.getElementById("sport");
const worldCupYear = document.getElementById("year");
const headCoach = document.getElementById("head-coach");
const playerCards = document.getElementById("player-cards");
const playersDropdownList = document.getElementById("players");

// Define favorite football team object with detailed info
const myFavoriteFootballTeam = {
  team: "Argentina",
  sport: "Football",
  year: 1986,
  isWorldCupWinner: true,
  headCoach: {
    coachName: "Carlos Bilardo",
    matches: 7,
  },
  players: [
    // Array of player objects with properties like name, position, etc.
    // (player data omitted here for brevity)
  ],
};

// Make the team object immutable
Object.freeze(myFavoriteFootballTeam);

// Destructure key properties for easy access
const { sport, team, year, players } = myFavoriteFootballTeam;
const { coachName } = myFavoriteFootballTeam.headCoach;

// Set text content in the DOM using object data
typeOfSport.textContent = sport;
teamName.textContent = team;
worldCupYear.textContent = year;
headCoach.textContent = coachName;

// Function to render player cards based on array passed
const setPlayerCards = (arr = players) => {
  playerCards.innerHTML += arr
    .map(
      ({ name, position, number, isCaptain, nickname }) => {
        return `
        <div class="player-card">
          <h2>${isCaptain ? "(Captain)" : ""} ${name}</h2>
          <p>Position: ${position}</p>
          <p>Number: ${number}</p>
          <p>Nickname: ${nickname !== null ? nickname : "N/A"}</p>
        </div>
      ` }
    )
    .join("");
};

// Listen for dropdown changes to filter players by role or nickname
playersDropdownList.addEventListener("change", (e) => {
  // Clear current player cards
  playerCards.innerHTML = "";

  // Filter players based on selected value and render cards
  switch (e.target.value) {
    case "nickname":
      setPlayerCards(players.filter((player) => player.nickname !== null));
      break;
    case "forward":
      setPlayerCards(players.filter((player) => player.position === "forward"));
      break;
    case "midfielder":
      setPlayerCards(players.filter((player) => player.position === "midfielder"));
      break;
    case "defender":
      setPlayerCards(players.filter((player) => player.position === "defender"));
      break;
    case "goalkeeper":
      setPlayerCards(players.filter((player) => player.position === "goalkeeper"));
      break;
    default:
      setPlayerCards(); // Default: show all players
  }
});
