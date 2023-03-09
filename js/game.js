let canvas;
let world;
let keyboard = new Keyboard();
let sound = true;
let music = true;


/**
 * initializes the game world 
 */
async function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  const viewportMetaTag = document.querySelector("meta[name=viewport]");
  if (viewportMetaTag) {
    viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui, viewport-fit=cover');
  }
}


/**
 * Toggle the music, switching it on and off. 
 * Also toggles the class of the element with ID "music" for visual indication
 *
 * @function
 * @param {string} id - id of the element to be toggled
 */
function toggleMusic() {
  music = music ? false : true;
  document.getElementById("music").classList.toggle("selected");
}


/**
 * Toggle the sounds, switching it on and off. 
 * Also toggles the class of the element with ID "sounds" for visual indication
 *
 * @function
 * @param {string} id - id of the element to be toggled
 */
function toggleSounds() {
  sound = sound ? false : true;
  document.getElementById("sounds").classList.toggle("selected");
}


/**
 * Toggles the visibility of the Heads Up Display (HUD) by toggling the "toggleHUD" class of 
 * three elements with respective ids "HUD","HUD-toggle", and "oval"
 *
 * @function
 * @param {string} id - id of the element to be toggled
 */
function toggleHUD() {
  document.getElementById("HUD").classList.toggle("toggleHUD");
  document.getElementById("HUD-toggle").classList.toggle("toggleHUD");
  document.getElementById("oval").classList.toggle("toggleHUD");
}



/**
 * Toggles the visibility of the control scheme by toggling the "flex" class of 
 * the element with id "control-scheme" and toggling the "selected-ctrl" class of the element with id "controls"
 *
 * @function
 */
function showControls() {
  document.getElementById("control-scheme").classList.toggle("flex");
  document.getElementById("controls").classList.toggle("selected-ctrl");
}


/**
 * Toggles fullscreen and close the HUD upon execution.
 */
function toggleFullscreen() {
  toggleHUD();
  document.getElementById("canvas").requestFullscreen();
}