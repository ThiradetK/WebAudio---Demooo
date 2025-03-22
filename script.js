const ctx = new AudioContext();

// Function to play a note
function playNote(frequency, startTime, duration) {
  const oscillator = ctx.createOscillator();
  oscillator.type = "triangle"; // Waveform type: sine, square, triangle, or sawtooth
  oscillator.frequency.value = frequency;

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, ctx.currentTime + startTime);
  gainNode.gain.linearRampToValueAtTime(
    0.5,
    ctx.currentTime + startTime + duration / 8
  );
  gainNode.gain.linearRampToValueAtTime(
    0,
    ctx.currentTime + startTime + duration
  );

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(ctx.currentTime + startTime);
  oscillator.stop(ctx.currentTime + startTime + duration);
}

const midiToFrequency = (note) => 440 * 2 ** ((note - 69) / 12);

const tempo = 120;
const beatDuration = 60 / tempo;
// const baseNote = 64; // On KeyBorad
const baseNote = 60 - 12;
const startTime = 0;
const noteDuration = 0.3;

// const scale = [0, 2, 4, 5, 7, 9, 11, 12]; // On KeyBorad
const scale = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47,
];
const key = document.querySelectorAll(".key");
const KeyBoard = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "=",
  "Backspace",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "[",
  "]",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";",
  "'",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "/",
  "Shift",
  "Control",
  "Alt",
];

// On KeyBorad New
window.onkeydown = (e) => {
  const keyIndex = KeyBoard.indexOf(e.key);
  if (keyIndex >= 0 && keyIndex < scale.length) {
    const noteFrequency = midiToFrequency(baseNote + scale[keyIndex]);
    playNote(noteFrequency, startTime, noteDuration);
    key[keyIndex].classList.add("key--red");
  }
};

window.onkeyup = (e) => {
  const keyIndex = KeyBoard.indexOf(e.key);
  if (keyIndex >= 0 && keyIndex < scale.length) {
    key[keyIndex].classList.remove("key--red");
  }
};

// ใช้เมาส์
window.onclick = (e) => {
  const keyIndex = Array.from(key).indexOf(e.target);
  console.log(keyIndex);
  if (keyIndex >= 0 && keyIndex <= scale.length) {
    const noteFrequency = midiToFrequency(baseNote + scale[keyIndex]);
    playNote(noteFrequency, startTime, noteDuration);
  }
};

window.onclick = (e) => {
  const keyIndex = Array.from(key).indexOf(e.target);

  if (keyIndex >= 0 && keyIndex <= scale.length) {
    const noteFrequency = midiToFrequency(baseNote + scale[keyIndex]);
    playNote(noteFrequency, startTime, noteDuration);
    key[scale[keyIndex]].classList.add("key--red");

    setTimeout(() => {
      key[scale[keyIndex]].classList.remove("key--red");
    }, 150);
  }
};

/*
// On KeyBorad
window.onkeydown = (e) => {
  const keyIndex = e.keyCode - 0x31;

  if (keyIndex >= 0 && keyIndex <= scale.length) {
    const noteFrequency = midiToFrequency(baseNote + scale[keyIndex]);
    playNote(noteFrequency, startTime, noteDuration);
  }
};

window.onkeydown = (e) => {
  const keyIndex = e.keyCode - 0x31;

  console.log(`Press Key board: ${keyIndex}`);

  if (keyIndex >= 0 && keyIndex <= scale.length) {
    const noteFrequency = midiToFrequency(baseNote + scale[keyIndex]);
    playNote(noteFrequency, startTime, noteDuration);
    key[scale[keyIndex]].classList.add("key--red");
  }
};

window.onkeyup = (e) => {
  const keyIndex = e.keyCode - 0x31;

  if (keyIndex >= 0 && keyIndex <= scale.length) {
    key[scale[keyIndex]].classList.remove("key--red");
  }
};
*/
