const socket = io();

const playerArena = document.getElementById("player-arena");

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
    <div class="player-section" id="player-${users[i].id}-section">
        <div class="letter-section" id="player-${users[i].id}-letters"> 
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[0]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[1]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[2]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[3]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[4]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[5]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[6]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[7]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[8]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[9]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[10]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[11]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[12]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[13]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[14]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[15]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[16]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[17]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[18]} </p>
          <p id="player-${users[i].id}-letter-1"> ${users[i].letters[19]} </p>
        
        </div> 
        <div class="word-section">
            <input type="text" class="word" id="player-${users[i].id}-word-1">
            <div class="word-value"> 0 </div>
            <div class="word-part-of-speech"> POS </div>

            <input type="text" class="word" id="player-${users[i].id}-word-2">
            <div class="word-value"> 0 </div>
            <div class="word-part-of-speech"> POS </div>

            <input type="text" class="word" id="player-${users[i].id}-word-3">
            <div class="word-value"> 0 </div>
            <div class="word-part-of-speech"> POS </div>

            <input type="text" class="word" id="player-${users[i].id}-word-4">
            <div class="word-value"> 0 </div>
            <div class="word-part-of-speech"> POS </div>

            <input type="text" class="word" id="player-${users[i].id}-word-5">
            <div class="word-value"> 0 </div>
            <div class="word-part-of-speech"> POS </div>

            <input type="text" class="word" id="player-${users[i].id}-word-6">
            <div class="word-value"> 0 </div>
            <div class="word-part-of-speech"> POS </div>

            <input type="text" class="word" id="player-${users[i].id}-word-7">
            <div class="word-value"> 0 </div>
            <div class="word-part-of-speech"> POS </div>

            <input type="text" class="word" id="player-${users[i].id}-word-8">
            <div class="word-value"> 0 </div>
            <div class="word-part-of-speech"> POS </div>

            <input type="text" class="word" id="player-${users[i].id}-word-9">
            <div class="word-value"> 0 </div>
            <div class="word-part-of-speech"> POS </div>

            <input type="text" class="word" id="player-${users[i].id}-word-10">
            <div class="word-value"> 0 </div>
            <div class="word-part-of-speech"> POS </div>
            
        
        
        </div>
    </div>
    `
    );
  }
});
