//variable kumpulan gambar kartu

const images = [
  "Asset/Images/Kartu/apple.png",
  "Asset/Images/Kartu/bananas.png",
  "Asset/Images/Kartu/cherries.png",
  "Asset/Images/Kartu/grapes.png",
  "Asset/Images/Kartu/orange.png",
  "Asset/Images/Kartu/pineapple.png",
  "Asset/Images/Kartu/strawberry.png",
  "Asset/Images/Kartu/watermelon.png",
  "Asset/Images/Kartu/dragon-fruit.png",
  "Asset/Images/Kartu/passion-fruit.png",
];

let firstCard = null;
let secondCard = null;
let canFlip = true;
let matches = 0;
let score = 0;
let timeLeft = 60;
let timer = null;
let gameOver = false;
let music = document.getElementById("audio");
let musicOn = false;
let paused = false;

//untuk mengatur musik on off

function btnControlMusic() {
  let bgMusic = document.querySelector(".btnMusic");
  if (!musicOn) {
    music.play();
    musicOn = true;
    bgMusic.classList.add("bgMusic");
  } else {
    music.pause();
    musicOn = false;
    bgMusic.classList.remove("bgMusic");
  }
}

//untuk pause game

function togglePause() {
  if (paused) return; // biar gak double pause

  paused = true;
  document.getElementById("pauseIcon").className = "fa-solid fa-play";

  Swal.fire({
    title: "Game Paused",
    text: "Click resume to continue the game",
    icon: "info",
    allowOutsideClick: false,
    allowEscapeKey: false,
    confirmButtonText: "Resume",
  }).then(() => {
    paused = false;
    document.getElementById("pauseIcon").className = "fa-solid fa-pause";
  });
}

// untuk mengatur waktu in game

function startTimer() {
  clearInterval(timer);
  document.getElementById("time").textContent = "1:00";

  timer = setInterval(() => {
    if (paused || gameOver) return;

    timeLeft--;
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById("time").textContent =
      `${m}:${s < 10 ? "0" : ""}${s}`;

    if (timeLeft <= 0) {
      endGame(false);
    }
  }, 1000);
}

//untuk mengatur start gamee

window.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("playerName");
  const nameText = document.getElementById("nameInput");

  if (nameText) {
    if (name) {
      nameText.textContent = "Welcome and enjoy playing " + name + "!";
    }
  }
});

function startGame() {
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";

  let cards = [...images, ...images].sort(() => Math.random() - 0.5);

  cards.forEach((img) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.image = img;
    card.innerHTML = `
      <div class="card-front">❤️</div>
      <div class="card-back"><img src="${img}"></div>
    `;
    card.onclick = flipCard;
    board.appendChild(card);
  });

  firstCard = secondCard = null;
  canFlip = true;
  matches = 0;
  score = 0;
  gameOver = false;
  timeLeft = 60;

  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = "1:00";

  startTimer();
}

//untuk mengatur flip card

function flipCard() {
  if (paused || gameOver) return; // kalau dia di-pause atau game over, gak bisa di-flip
  if (!canFlip || this === firstCard || this.classList.contains("matched")) // kalau canFlip === false atau kartu yg baru di-flip atau ada class "matched", jadi gak bisa di-flip
    return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    canFlip = false;
    checkMatch();
  }
}

//untuk mengecek match

function checkMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    setTimeout(() => {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");

      matches++;
      score += 10; // ⭐ SCORE NAIK SAAT MATCH
      document.getElementById("score").textContent = score;

      resetCards();

      if (matches === images.length) {
        endGame(true);
      }
    }, 400);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetCards();
    }, 700);
  }
}

function resetCards() {
  firstCard = secondCard = null;
  canFlip = true;
}

//untuk membuat end game

function endGame(isWin) {
  gameOver = true;
  clearInterval(timer);

  if (isWin) {
    document.getElementById("finalScore").textContent = score;
    document.getElementById("finalTime").textContent =
      document.getElementById("time").textContent;
    document.getElementById("winModal").classList.add("show");
  } else {
    Swal.fire({
      icon: "error",
      title: "Game Over",
      text: "Time is up!",
    });
  }
}

function newGame() {
  document.getElementById("winModal").classList.remove("show");
  startGame();
}

startGame();

//kembali ke Home
  
function backToHome(){
  window.location.href = "index.html";
}
