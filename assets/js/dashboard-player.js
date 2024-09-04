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


// HANDLING POPOVERS
// Note: popoverHandler(targetId) also uses functions from timeUpdate.js
// so make sure timeUpdate.js is included in the template before this file

// Get all buttons with the class 'dashboard-button'
const dashboardButtons = document.querySelectorAll('.dashboard-button');

dashboardButtons.forEach(button => {
    // Read the popovertarget attribute of the button to get the targetId
    const popoverTargetID = button.getAttribute('popovertarget');

    // Add a click event listener to each dashboard button
    button.addEventListener('click', () => {
        popoverHandler(popoverTargetID);
    });
});

function popoverHandler(targetId) {
    // Get the target popover element by its ID
    const targetPopoverElement = document.getElementById(targetId);

    // When the collaborators popover is open startUpdatingTimes() from timeUpdate.js
    // When other popovers open, stopUpdatingTimes(): change this when you figure out a way to detect popover soft close
    if (targetId === 'collaborators') {
        startUpdatingTimes();          
    } 
    else {
        stopUpdatingTimes();
    }

    // Get the close button inside the popover div element
    const closeButton = targetPopoverElement.querySelector('.close-button');

    // Get the CSSStyleDeclaration for the :popover-open pseudo element
    // This is used to define fallback behavior for unsupported browsers
    const popOpenPseudo = window.getComputedStyle(targetPopoverElement, ':popover-open')

    // Check if the CSSStyleDeclaration object has any style declarations:
    // unsupported browser don't render the pseudo elment, so length equals 0
    // and we can use the inline display property to control the visibility of the target popover div
    if (popOpenPseudo.length === 0) {
        // Make sure all popover divs are hidden first, so they don't pile up
        const allPopoverElements = document.querySelectorAll('.additional-info');
        allPopoverElements.forEach(div => {
            div.style.display = 'none';
        });
        // Then show just the target popover element
        targetPopoverElement.style.display = 'block';

        // And switch display back to none if the close button is clicked
        closeButton.addEventListener('click', () => {
            targetPopoverElement.style.display = 'none';
        });
    }
    else {
        // If the browser renders the :popover-open pseudo element, we should be good to go
        // and just use hidePopover() when the close button is clicked 
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                targetPopoverElement.hidePopover();
                // Call stopUpdatingTimes from timeUpdate.js when the collaborators popover is closed
                if (targetId === 'collaborators') {
                    stopUpdatingTimes();
                }
            });
        }
    }
}
