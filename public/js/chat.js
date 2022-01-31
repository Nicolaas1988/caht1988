// const { response } = require("express");

const socket = io();

const playerArena = document.getElementById("player-arena");
let oldWordValue;
let currentWord;
let charAllowed;

// query string
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.on("playerTurn", (data) => console.log(data));
socket.on("createPlayerSection", (data) =>
  console.log(`This is the data that needs tobe rendered ${data}`)
);

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

socket.on("generateNewPlayerSection", (users) => {
  playerArena.innerHTML = "";
  for (i = 0; i < users.length; i++) {
    playerArena.insertAdjacentHTML(
      "beforeend",
      `
    <div class="card">
      <div class="player-section" id="player-${users[i].id}-section">
          <div class="name-container"> ${users[i].username}</div>
          <div class="letter-section" id="player-${users[i].id}-letters"> 
            <p id="player-${users[i].id}-letter-0"> ${users[i].letters[0]} </p>
            <p id="player-${users[i].id}-letter-1"> ${users[i].letters[1]} </p>
            <p id="player-${users[i].id}-letter-2"> ${users[i].letters[2]} </p>
            <p id="player-${users[i].id}-letter-3"> ${users[i].letters[3]} </p>
            <p id="player-${users[i].id}-letter-4"> ${users[i].letters[4]} </p>
            <p id="player-${users[i].id}-letter-5"> ${users[i].letters[5]} </p>
            <p id="player-${users[i].id}-letter-6"> ${users[i].letters[6]} </p>
            <p id="player-${users[i].id}-letter-7"> ${users[i].letters[7]} </p>
            <p id="player-${users[i].id}-letter-8"> ${users[i].letters[8]} </p>
            <p id="player-${users[i].id}-letter-9"> ${users[i].letters[9]} </p>
            <p id="player-${users[i].id}-letter-10"> ${users[i].letters[10]} </p>
            <p id="player-${users[i].id}-letter-11"> ${users[i].letters[11]} </p>
            <p id="player-${users[i].id}-letter-12"> ${users[i].letters[12]} </p>
            <p id="player-${users[i].id}-letter-13"> ${users[i].letters[13]} </p>
            <p id="player-${users[i].id}-letter-14"> ${users[i].letters[14]} </p>
            <p id="player-${users[i].id}-letter-15"> ${users[i].letters[15]} </p>
            <p id="player-${users[i].id}-letter-16"> ${users[i].letters[16]} </p>
            <p id="player-${users[i].id}-letter-17"> ${users[i].letters[17]} </p>
            <p id="player-${users[i].id}-letter-18"> ${users[i].letters[18]} </p>
            <p id="player-${users[i].id}-letter-19"> ${users[i].letters[19]} </p>
          
          </div> 
          <div class="word-section">
              <input type="text" class="word" id="player-${users[i].id}-word-1">
              <div class="word-value" id="player-${users[i].id}-word-1-val"> 0 </div>
              <div class="word-part-of-speech"> POS </div>

              <input type="text" class="word" id="player-${users[i].id}-word-2">
              <div class="word-value" id="player-${users[i].id}-word-2-val"> 0 </div>
              <div class="word-part-of-speech"> POS </div>

              <input type="text" class="word" id="player-${users[i].id}-word-3">
              <div class="word-value" id="player-${users[i].id}-word-3-val"> 0 </div>
              <div class="word-part-of-speech"> POS </div>

              <input type="text" class="word" id="player-${users[i].id}-word-4">
              <div class="word-value" id="player-${users[i].id}-word-4-val"> 0 </div>
              <div class="word-part-of-speech"> POS </div>

              <input type="text" class="word" id="player-${users[i].id}-word-5">
              <div class="word-value" id="player-${users[i].id}-word-5-val"> 0 </div>
              <div class="word-part-of-speech"> POS </div>

              <input type="text" class="word" id="player-${users[i].id}-word-6">
              <div class="word-value" id="player-${users[i].id}-word-6-val"> 0 </div>
              <div class="word-part-of-speech"> POS </div>

              <input type="text" class="word" id="player-${users[i].id}-word-7">
              <div class="word-value" id="player-${users[i].id}-word-7-val"> 0 </div>
              <div class="word-part-of-speech"> POS </div>

              <input type="text" class="word" id="player-${users[i].id}-word-8">
              <div class="word-value" id="player-${users[i].id}-word-8-val"> 0 </div>
              <div class="word-part-of-speech"> POS </div>

              <input type="text" class="word" id="player-${users[i].id}-word-9">
              <div class="word-value" id="player-${users[i].id}-word-9-val"> 0 </div>
              <div class="word-part-of-speech"> POS </div>

              <input type="text" class="word" id="player-${users[i].id}-word-10">
              <div class="word-value" id="player-${users[i].id}-word-10-val"> 0 </div>
              <div class="word-part-of-speech"> POS </div>
              
          
          
          </div>
      </div>
    </div>
    `
    );
  }
});

//Word Input
document.addEventListener("click", function (c) {
  if (c.target.matches(".word")) {
    oldWordValue = c.target.value;
  }
});

document.addEventListener("keydown", function (kd) {
  if (kd.target.matches(".word")) {
    oldWordValue = kd.target.value;
  }
});

document.addEventListener("keydown", function (k) {
  if (k.target.matches(".word")) {
    let word = k.target.value;
    let lastChar = word.charAt(word.length - 1);
    console.log(lastChar);

    socket.emit("checkCharReq", k.key, lastChar);
    currentWord = k.target.id;
  }
});

socket.on("checkCharRes", (checked) => {
  if (checked === false) {
    document.getElementById(`${currentWord}`).value = oldWordValue;
  } else {
    document.getElementById(
      `player-${checked[0]}-letter-${checked[1]}`
    ).textContent = checked[2];

    let wordValue = document.getElementById(`${currentWord}`).value;
    let wordPosition = currentWord;
    let letterPosition = `player-${checked[0]}-letter-${checked[1]}`;
    let letterValue = checked[2];

    socket.emit(
      "updatePlayerArenaReq",
      wordValue,
      wordPosition,
      letterValue,
      letterPosition
    );
  }
});

socket.on(
  "updatePlayerArenaRes",
  (wordValue, wordPosition, letterValue, letterPosition) => {
    document.getElementById(`${wordPosition}`).value = wordValue;
    document.getElementById(`${letterPosition}`).textContent = letterValue;
  }
);
