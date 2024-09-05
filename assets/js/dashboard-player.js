// CUSTOM AUDIO PLAYER

// Get the audio element and all buttons and icons that need to be updated
var audio = document.getElementById("soundscape");

const playButton = document.querySelector(".player-play-btn");
const playIcon = playButton.querySelector(".player-icon-play");
const pauseIcon = playButton.querySelector(".player-icon-pause");

const volumeControl = document.querySelector(".player-volume")
const muteButton = document.querySelector(".player-mute-btn");

// These are groups inside the svg in the .player-icon-value div
const volumeIconMute = document.getElementById("audioplayer_volume_icon_playing_muted");
const volumeIconLow = document.getElementById("audioplayer_volume_icon_playing_low");
const volumeIconMid = document.getElementById("audioplayer_volume_icon_playing_mid");
const volumeIconHigh = document.getElementById("audioplayer_volume_icon_playing_high");

let currentVolume;

// Play button functionality: switch between play and pause
playButton.addEventListener("click", () => {
    if (playButton.dataset.playing === "false") {
        audio.play();
        playButton.dataset.playing = "true";
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
    } 
    else if (playButton.dataset.playing === "true") {
        audio.pause();
        playButton.dataset.playing = "false";
        pauseIcon.classList.add("hidden");
        playIcon.classList.remove("hidden");
    }
});

// Update volume icons depending on volume level
function updateVolumeIcons() {
    if (audio.volume === 0) {
        volumeIconMute.classList.remove("hidden");
        volumeIconLow.classList.add("hidden");
        volumeIconMid.classList.add("hidden");
        volumeIconHigh.classList.add("hidden");
    } 
    else if (audio.volume > 0 && audio.volume < 0.3 ) {
        volumeIconMute.classList.add("hidden");
        volumeIconLow.classList.remove("hidden");
        volumeIconMid.classList.add("hidden");
        volumeIconHigh.classList.add("hidden");
    }
    else if (audio.volume >= 0.3 && audio.volume < 0.7 ) {
        volumeIconMute.classList.add("hidden");
        volumeIconLow.classList.remove("hidden");
        volumeIconMid.classList.remove("hidden");
        volumeIconHigh.classList.add("hidden");
    }
    else if (audio.volume >= 0.7) {
        volumeIconMute.classList.add("hidden");
        volumeIconLow.classList.remove("hidden");
        volumeIconMid.classList.remove("hidden");
        volumeIconHigh.classList.remove("hidden");
    }
}
// Update volume icons when the volume slider value changes
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
    updateVolumeIcons();
});
// When the muteButton is clicked, either set volume to 0 or switch back to previous volume
muteButton.addEventListener("click", () => {
    if (volumeControl.value > 0) {
        currentVolume = volumeControl.value;
        audio.volume = 0;
        volumeControl.value = 0;
        updateVolumeIcons();
    }    
    else {
        audio.volume = currentVolume;
        volumeControl.value = currentVolume;
        updateVolumeIcons();
    }
});
