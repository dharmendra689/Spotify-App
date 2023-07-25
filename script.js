console.log("Welcome to Spotify");

// Initialize the Variables
let currentSongIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let iconsPlay = document.getElementById('iconsPlays');

let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Set fire to the rain", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Passenger - Let her go", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Gangsta's Paradise", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Neffex -Grateful", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Zoro - Whatever it takes", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Aarambh hai Prachand", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "After dark x Sweater Weather", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Summertime Sadness Lana del Ray", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

const playSong = (songIndex) => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    iconsPlay.classList.remove('fa-play');
    iconsPlay.classList.add('fa-pause');
    currentSongIndex = songIndex; // Update the currentSongIndex to the new song index
};

// Handle play/pause click for the masterPlay button
const togglePlayPause = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        iconsPlay.classList.remove('fa-play');
        iconsPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        iconsPlay.classList.remove('fa-pause');
        iconsPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
};

masterPlay.addEventListener('click', togglePlayPause);
iconsPlay.addEventListener('click', togglePlayPause);

// Handle play/pause click for the iconsPlay buttons in the song list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const songIndex = parseInt(e.target.id);
        if (songIndex === currentSongIndex) {
            togglePlayPause();
        } else {
            playSong(songIndex);
        }
    });
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Update the song icons in the song list
const updateSongIconsInList = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
        if (i === currentSongIndex) {
            element.classList.remove('fa-play');
            element.classList.add('fa-pause');
        } else {
            element.classList.remove('fa-pause');
            element.classList.add('fa-play');
        }
    });
};

// Handle "Next" button click
document.getElementById('next').addEventListener('click', () => {
    let nextSongIndex = currentSongIndex + 1;
    if (nextSongIndex >= songs.length) {
        nextSongIndex = 0;
    }
    playSong(nextSongIndex);

    updateSongIconsInList(); // Call the function to update the song icons in the song list
});

// Handle "Previous" button click
document.getElementById('previous').addEventListener('click', () => {
    let previousSongIndex = currentSongIndex - 1;
    if (previousSongIndex < 0) {
        previousSongIndex = songs.length - 1;
    }
    playSong(previousSongIndex);

    updateSongIconsInList(); // Call the function to update the song icons in the song list
});

// Handle "Stop" button click
document.getElementById('stop').addEventListener('click', () => {
    audioElement.pause();
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
    iconsPlay.classList.remove('fa-pause');
    iconsPlay.classList.add('fa-play');
    gif.style.opacity = 0;
});
