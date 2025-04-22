// Select DOM elements related to player controls and playlist display
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

// Define the full list of songs available in the playlist
const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
];

// Create audio object for song playback
const audio = new Audio();

// Define user data to track playlist state and currently playing song
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

// Function to play a song by its ID
const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id); // Find song by ID
  audio.src = song.src;
  audio.title = song.title;

  // Reset playback time if switching to a different song
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime; // Resume from previous time
  }

  userData.currentSong = song;
  playButton.classList.add("playing");

  highlightCurrentSong(); // Visually highlight currently playing song
  setPlayerDisplay(); // Show song info in player
  setPlayButtonAccessibleText(); // Update ARIA label for accessibility
  audio.play(); // Start audio playback
};

// Function to pause the currently playing song
const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime; // Save current time
  playButton.classList.remove("playing");
  audio.pause(); // Pause audio
};

// Function to play the next song in the playlist
const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id); // Start from beginning if no song is playing
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id); // Play next song
  }
};

// Function to play the previous song in the playlist
const playPreviousSong = () => {
   if (userData?.currentSong === null) return;
   const currentSongIndex = getCurrentSongIndex();
   const previousSong = userData?.songs[currentSongIndex - 1];
   playSong(previousSong.id); // Play previous song
};

// Function to shuffle songs in the playlist
const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5); // Shuffle array randomly
  userData.currentSong = null;
  userData.songCurrentTime = 0;
  renderSongs(userData?.songs); // Re-render playlist
  pauseSong(); // Reset playback
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

// Function to delete a song from the playlist by its ID
const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong(); // Pause if deleted song was playing
    setPlayerDisplay();
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id); // Remove song
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();
};

// Update the player UI with the current song's title and artist
const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

// Visually indicate the currently playing song in the playlist
const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current"); // Remove highlight
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true"); // Highlight current song
};

// Render the song list in the playlist
const renderSongs = (array) => {
  const songsHTML = array
    .map((song)=> {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg>...</svg>
        </button>
      </li>
      `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;

  // If no songs left, show reset button
  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs]; // Restore full list
      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  }
};

// Set the accessible label on the play button
const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];
  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

// Get index of the currently playing song in the playlist
const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

// Event listener: Play button
playButton.addEventListener("click", () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

// Event listener: Pause button
pauseButton.addEventListener("click", pauseSong);

// Event listener: Next button
nextButton.addEventListener("click", playNextSong);

// Event listener: Previous button
previousButton.addEventListener("click", playPreviousSong);

// Event listener: Shuffle button
shuffleButton.addEventListener("click", shuffle);

// Event listener: When song ends, play next or reset player
audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

// Sort songs alphabetically by title
const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });

  return userData?.songs;
};

// Initial render of playlist and setup of play button accessibility
renderSongs(sortSongs());
setPlayButtonAccessibleText();
