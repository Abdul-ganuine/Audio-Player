const music = document.getElementById('audio');
const play = document.getElementById('play');
const previousBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const artist  = document .getElementById('artist');
const songTitle  = document .getElementById('title');
const img =document.querySelector('img')
const progress = document.getElementById('progress')
const progressContainer =document.getElementById('progress-container')
const currentTimeEl= document.getElementById('current-time')
const durationEl= document.getElementById('duration')

const catalog =[
    {
        artist:'Lil Baby',
        songTitle:'I know how it feel',
        name:'lil-baby'
    },
    {
        artist:'Lil Yatchy',
        songTitle:'Geeking',
        name:'lil-yatchy'
    },
    {
        artist:'Lil Baby ft Gunna',
        songTitle:'Drip Too Hard',
        name:'4pf'
    }
];

//Current Song Index
let songIndex =0;


//Song info
function songInfo(song){
    artist.textContent = song.artist;
    title.textContent = song.songTitle;
    music.src=`Music/${song.name}.mp3`
    img.src=`images/${song.name}.jpg`
}
songInfo(catalog[songIndex]);

//Functions

//Play
function playSong(){
    play.classList.replace('fa-play','fa-pause');
    play.setAttribute('title' ,'pause');
    music.play();  
}

//Pause 
function pauseSong(){
    play.classList.replace('fa-pause','fa-play');
    play.setAttribute('title' ,'play');
    music.pause();
}

//Toogle play state or pause state
function playPause(){
    if(play.classList.contains('fa-play')){
        playSong();
    }else if(play.classList.contains('fa-pause')){
        pauseSong();
    }
}

//Next Song
function nextSong(){
    if(songIndex == catalog.length-1){
        songIndex = 0;
        songInfo(catalog[songIndex]);
        playSong();
    }else{
        songIndex=songIndex+1;
        songInfo(catalog[songIndex]);
        playSong();
    }
}

//Pervious Song
function prevSong(){
    if(songIndex == 0){
        songIndex = catalog.length-1;
        songInfo(catalog[songIndex]);
        playSong();
    }else{
        songIndex=songIndex-1;
        songInfo(catalog[songIndex]);
        playSong();
    }
}


function updateProgress(e){
    if(play.classList.contains('fa-pause')){
        const { duration , currentTime} = e.srcElement;
        const progressPercentage = (currentTime/duration)*100;
        progress.style.width=`${progressPercentage}%`

        //Calculate duration time
        const durationMin=Math.floor(duration/60);
        let durationSeconds = Math.floor(duration % 60)
        if(durationSeconds<10){
            durationSeconds =`0${durationSeconds}`;
        }
        
        //Delay duration for NaN 
        if(durationSeconds){
            durationEl.textContent=`${durationMin}:${durationSeconds}`
        }


        //Calculate current time
        const currentMin=Math.floor(currentTime/60);
        let currentSeconds= Math.floor(currentTime % 60)
        if(currentSeconds<10){
            currentSeconds =`0${currentSeconds}`;
        }
        currentTimeEl.textContent=`${currentMin}:${currentSeconds}`
    }
}
//Click to change where music is
function setProgressBar(e){
    let widthPosition=e.offsetX;
    let containerWidth=this.clientWidth

    const {duration} = music;
    music.currentTime=(widthPosition/containerWidth)*duration;
}
//Event listeners
play.addEventListener('click',playPause);
nextBtn.addEventListener('click',nextSong);
previousBtn.addEventListener('click',prevSong);
music.addEventListener('timeupdate',updateProgress);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',setProgressBar);
