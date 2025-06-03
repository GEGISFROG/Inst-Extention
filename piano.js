var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var oscillators = {}; // 키 코드별로 oscillator 저장용
var instType = 'sine';
document.getElementById('sine').style.backgroundColor = '#00F604'
var keyToButtonId = {
  'KeyQ': 'playButtonDo',
  'KeyW': 'playButtonRe',
  'KeyE': 'playButtonMi',
  'KeyR': 'playButtonFa',
  'KeyT': 'playButtonSol',
  'KeyY': 'playButtonLa',
  'KeyU': 'playButtonSi',
  'KeyI': 'playButtonHdo',
  'KeyO': 'playButtonHre',
  'KeyP': 'playButtonHmi',
  'Digit2': 'playButtonDoSh',
  'Digit3': 'playButtonReSh',
  'Digit5': 'playButtonFaSh',
  'Digit6': 'playButtonSolSh',
  'Digit7': 'playButtonLaSh',
  'KeyM': 'playButtonLSi',
  'KeyN': 'playButtonLLa',
  'KeyB': 'playButtonLSol',
  'KeyV': 'playButtonLFa',
  'KeyC': 'playButtonLMi',
  'KeyX': 'playButtonLRe',
  'KeyZ': 'playButtonLDo',
  'Digit9': 'playButtonHDoSh',
  'Digit0': 'playButtonHReSh',
  'KeyS': 'playButtonLDoSh',
  'KeyD': 'playButtonLReSh',
  'KeyG': 'playButtonLFaSh',
  'KeyH': 'playButtonLSolSh',
  'KeyJ': 'playButtonLLaSh'
};

document.getElementById('sine').addEventListener('click', function() {
    instType = 'sine';
    document.getElementById('square').style.backgroundColor = 'lightgray';
    document.getElementById('triangle').style.backgroundColor = 'lightgray';
    document.getElementById('sawtooth').style.backgroundColor = 'lightgray';
    document.getElementById('sine').style.backgroundColor = '#00F604'
});
document.getElementById('square').addEventListener('click', function() {
    instType = 'square';
    document.getElementById('square').style.backgroundColor = '#00F604'
    document.getElementById('sine').style.backgroundColor = 'lightgray';
    document.getElementById('triangle').style.backgroundColor = 'lightgray';
    document.getElementById('sawtooth').style.backgroundColor = 'lightgray';
});
document.getElementById('triangle').addEventListener('click', function() {
    instType = 'triangle';
    document.getElementById('triangle').style.backgroundColor = '#00F604'
    document.getElementById('sine').style.backgroundColor = 'lightgray';
    document.getElementById('square').style.backgroundColor = 'lightgray';
    document.getElementById('sawtooth').style.backgroundColor = 'lightgray';
});
document.getElementById('sawtooth').addEventListener('click', function() {
    instType = 'sawtooth';
    document.getElementById('sawtooth').style.backgroundColor = '#00F604'
    document.getElementById('sine').style.backgroundColor = 'lightgray';
    document.getElementById('square').style.backgroundColor = 'lightgray';
    document.getElementById('triangle').style.backgroundColor = 'lightgray';
});


function startNote(frequency, key, instrument) {
  if (oscillators[key]) return;

  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();
  var vol = document.getElementById('volume').value / 100;
  if (vol > 1) vol = 1;
  if (vol < 0) vol = 0;

  oscillator.type = instrument;
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();

  oscillators[key] = oscillator;

  var buttonId = keyToButtonId[key];
  if (buttonId) {
    document.getElementById(buttonId).style.backgroundColor = 'yellow';
  }
}

function stopNote(key) {
  if (oscillators[key]) {
    oscillators[key].stop();
    delete oscillators[key];
  }

  var buttonId = keyToButtonId[key];
  if (buttonId) {
    document.getElementById(buttonId).style.backgroundColor = 'lightgray';
  }
}


document.addEventListener('keydown', function(e) {
  switch (e.code) {
    case 'KeyM': startNote(246.94, 'KeyM', instType); break;
    case 'KeyN': startNote(220.00, 'KeyN', instType); break;
    case 'KeyB': startNote(196.00, 'KeyB', instType); break;
    case 'KeyV': startNote(174.61, 'KeyV', instType); break;
    case 'KeyC': startNote(164.81, 'KeyC', instType); break;
    case 'KeyX': startNote(146.83, 'KeyX', instType); break;
    case 'KeyZ': startNote(130.81, 'KeyZ', instType); break;
    case 'KeyQ': startNote(261.63, 'KeyQ', instType); break;
    case 'KeyW': startNote(293.66, 'KeyW', instType); break;
    case 'KeyE': startNote(329.63, 'KeyE', instType); break;
    case 'KeyR': startNote(349.23, 'KeyR', instType); break;
    case 'KeyT': startNote(392.00, 'KeyT', instType); break;
    case 'KeyY': startNote(440.00, 'KeyY', instType); break;
    case 'KeyU': startNote(493.88, 'KeyU', instType); break;
    case 'KeyI': startNote(523.25, 'KeyI', instType); break;
    case 'KeyO': startNote(587.33, 'KeyO', instType); break;
    case 'KeyP': startNote(659.25, 'KeyP', instType); break;
    case 'Digit2': startNote(277.18, 'Digit2', instType); break;
    case 'Digit3': startNote(311.13, 'Digit3', instType); break;
    case 'Digit5': startNote(369.99, 'Digit5', instType); break;
    case 'Digit6': startNote(415.30, 'Digit6', instType); break;
    case 'Digit7': startNote(466.16, 'Digit7', instType); break;
    case 'Digit9': startNote(554.37, 'Digit9', instType); break;
    case 'Digit0': startNote(622.25, 'Digit0', instType); break;
    case 'KeyJ': startNote(233.08, 'KeyJ', instType); break;
    case 'KeyH': startNote(207.65, 'KeyH', instType); break;
    case 'KeyG': startNote(185.00, 'KeyG', instType); break;
    case 'KeyD': startNote(155.56, 'KeyD', instType); break;
    case 'KeyS': startNote(138.59, 'KeyS', instType); break;
  }});

document.addEventListener('keyup', function(e) {
  stopNote(e.code);
});


document.getElementById('showKeyboard').addEventListener('click', function() {
    var keyMap = {
        'playButtonLSi': ['B', 'M'],
        'playButtonLLa': ['A', 'N'],
        'playButtonLSol': ['G', 'B'],
        'playButtonLFa': ['F', 'V'],
        'playButtonLMi': ['E', 'C'],
        'playButtonLRe': ['D', 'X'],
        'playButtonLDo': ['C', 'Z'],
        'playButtonDo': ['C', 'Q'],
        'playButtonRe': ['D', 'W'],
        'playButtonMi': ['E', 'E'],
        'playButtonFa': ['F', 'R'],
        'playButtonSol': ['G', 'T'],
        'playButtonLa': ['A', 'Y'],
        'playButtonSi': ['B', 'U'],
        'playButtonHdo': ['C', 'I'],
        'playButtonHre': ['D', 'O'],
        'playButtonHmi': ['E', 'P'],
        'playButtonDoSh': ['C#', '2'],
        'playButtonReSh': ['D#', '3'],
        'playButtonFaSh': ['F#', '5'],
        'playButtonSolSh': ['G#', '6'],
        'playButtonLaSh': ['A#', '7'],
        'playButtonHDoSh': ['C#', '9'],
        'playButtonHReSh': ['D#', '0'],
        'playButtonLLaSh': ['A#', 'J'],
        'playButtonLSolSh': ['G#', 'H'],
        'playButtonLFaSh': ['F#', 'G'],
        'playButtonLReSh': ['D#', 'D'],
        'playButtonLDoSh': ['S#', 'S']
    };

    var button = document.getElementById('showKeyboard');
    button.showingKeys = !button.showingKeys;

    var tiles = document.getElementsByClassName('tile');
    for (let tile of tiles) {
        var buttonId = tile.id;
        if (keyMap[buttonId]) {
            tile.textContent = button.showingKeys ? keyMap[buttonId][1] : keyMap[buttonId][0];
        }
    }
});