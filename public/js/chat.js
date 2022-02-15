// const { response } = require("express");
const nextPlayerBtn = document.getElementById("next-player-btn");

const socket = io();

const playerArena = document.getElementById("player-arena");
let oldWordValue;
let charAllowed;

// query string
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

socket.on("test", (users) => {
  console.log(users);
});

socket.on("generateNewPlayerSection", (users) => {
  playerArena.innerHTML = "";
  for (i = 0; i < users.length; i++) {
    playerArena.insertAdjacentHTML(
      "beforeend",
      `
    <div class="card" id="player-${users[i].id}-card">
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
          <div id="player-${users[i].id}-word-section" class= "hasDisableOption word-section" >
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
let previousWord = "";
let currentWord;
let wordId;

document.addEventListener("beforeinput", function (bi) {
  if (bi.target.matches(".word")) {
    wordId = bi.target.id;
    previousWord = bi.target.value;
    console.log(`Previous Word is ${previousWord}`);
  }
});

document.addEventListener("input", function (i) {
  currentWord = i.target.value;
  console.log(`Current input id ${i.target.id}`);

  console.log(`Current Word is ${currentWord}`);

  let diff = "";
  currentWord.split("").forEach(function (val, i) {
    if (val != previousWord.charAt(i)) diff += val;
  });
  console.log(`The difference is ${diff}`);

  socket.emit("checkCharReq", previousWord, currentWord, diff, wordId);
});

socket.on("checkCharRes", (charChecked, id, prevWord, curWord, wordId) => {
  if (charChecked === false) {
    document.getElementById(`${wordId}`).value = prevWord;
  }
  if (charChecked[0] === true) {
    document.getElementById(`${wordId}`).value = curWord;
    document.getElementById(
      `player-${id}-letter-${charChecked[1]}`
    ).textContent = "_";
    //
  }

  if (charChecked[0] === "Backspace") {
    document.getElementById(`${wordId}`).value = curWord;
    document.getElementById(
      `player-${id}-letter-${charChecked[1]}`
    ).textContent = charChecked[2];
  }
});

socket.on("nextPlayerRes", (turn) => {
  console.log(`Next player is ${turn}`);
});

nextPlayerBtn.addEventListener("click", () => {
  socket.emit("nextPlayer");
});

socket.on("disablePlayers", () => {
  let elementsToDisable = document.querySelectorAll(".hasDisableOption");
  elementsToDisable.forEach((el) => el.classList.add("disable-area"));
});

socket.on("enablePlayer", (id) => {
  console.log("ONly one person should receive this message on tunr");
  document
    .getElementById(`player-${id}-word-section`)
    .classList.remove("disable-area");
});

socket.on("removePlayerSection", (id) => {
  let playerToRemove = document.getElementById(`${id}`);

  if (playerToRemove) {
    playerToRemove.remove();
  }
});
