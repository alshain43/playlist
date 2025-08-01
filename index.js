const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'music/Music/music3.m4a',
        displayName: 'I Wanna Be Yours',
        cover: 'img/img/cat1.jpg ',
        artist: 'Arctic Monkeys',
    },
    {
        path: 'music/Music/music8.m4a',
        displayName: 'Daylight',
        cover: 'img/img/cat4.jpg',
        artist: 'Taylor Swift',
    },
    {
        path: 'music/Music/music10.m4a',
        displayName: 'It_s Not Living If It_s not with You',
        cover: 'img/img/flower.jpg',
        artist: 'The 1975',
    },
      {
        path: 'music/Music/music4.m4a',
        displayName: 'Never Let Me Go',
        cover: 'img/img/cat6.jpg',
        artist: 'Lana Del Rey',
    },
      {
        path: 'music/Music/music9.m4a',
        displayName: 'Falling For U',
        cover: 'img/img/flower2.jpg',
        artist: 'The 1975',
    },
      {
        path: 'music/Music/music7.m4a',
        displayName: 'Until I Found You',
        cover: 'img/img/cat8.jpg',
        artist: 'Stephen Sanchez',
    },
      {
        path: 'music/Music/music6.mp3',
        displayName: 'Way Back Home',
        cover: 'img/img/cat7.jpg',
        artist: 'SHAUN',
    },
      {
        path: 'music/Music/music1.m4a',
        displayName: 'Bye',
        cover: 'img/img/love.jpg',
        artist: 'Jaden',
    },
      {
        path: 'music/Music/music2.m4a',
        displayName: '24/7,365',
        cover: 'img/img/Adorable!.jpg',
        artist: 'elijah woods',
    },
      {
        path: 'music/Music/music5.m4a',
        displayName: 'Line Without a Hook',
        cover: 'img/img/cat5.jpg',
        artist: 'Ricky Montgomery',
    },
    {
        path: 'music/Music/music11.m4a',
        displayName: 'More Than Words',
        cover: 'img/img/cat3.jpg',
        artist: 'Emi Thasorn',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
