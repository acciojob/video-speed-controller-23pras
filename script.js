const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const volume = document.querySelector('input[name="volume"]');
const playbackRate = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

// Toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Volume & Speed
function handleRangeUpdate() {
  video[this.name] = parseFloat(this.value);
}

// Skip
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

// Scrub bar (click and drag)
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
volume.addEventListener('input', handleRangeUpdate);
playbackRate.addEventListener('input', handleRangeUpdate);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
