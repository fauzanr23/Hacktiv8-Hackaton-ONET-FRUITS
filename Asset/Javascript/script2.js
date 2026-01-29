const audio = document.getElementById("audio");
let musicOn = false;
let paused = false;

function btnControlMusic() {
  musicOn ? audio.pause() : audio.play();
  musicOn = !musicOn;
}

function togglePause() {
  paused = !paused;
  document.getElementById("pauseIcon").className =
    paused ? "fa-solid fa-play" : "fa-solid fa-pause";
}

/* ================= GAME DATA ================= */

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
  "Asset/Images/Kartu/passion-fruit.png"

];

let firstCard = null;
let secondCard = null;
let canFlip = true;
let matches = 0;
let score = 0;

/* COUNTDOWN */
let timeLeft = 60;
let timer = null;
let gameOver = false;

/* ================= TIMER ================= */

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

/* ================= START GAME ================= */

window.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("playerName");
  const nameText = document.getElementById("playerNameText");

  if (nameText) {
    if (name) {
      nameText.textContent = "Selamat datang " + name + "!";
    } 
  }
});

function startGame() {
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";

  let cards = [...images, ...images].sort(() => Math.random() - 0.5);
  console.log(cards);
  

  cards.forEach(img => {
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

/* ================= FLIP CARD ================= */

function flipCard() {
  if (paused || gameOver) return;
  if (!canFlip || this === firstCard || this.classList.contains("matched")) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    canFlip = false;
    checkMatch();
  }
}

/* ================= MATCH CHECK ================= */

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

/* ================= END GAME ================= */

function endGame(isWin) {
  gameOver = true;
  clearInterval(timer);

  if (isWin) {
    document.getElementById("finalScore").textContent = score;
    document.getElementById("finalTime").textContent =
      document.getElementById("time").textContent;
    document.getElementById("winModal").classList.add("show");
  } else {
    alert(`⏰ Waktu habis!\nScore akhir kamu: ${score}`);
  }
}

function newGame() {
  document.getElementById("winModal").classList.remove("show");
  startGame();
}

startGame();


//Database gambar kartu

let dbGambar = [
  { id: 1, gambar: "apple", src: "Asset/Images/Kartu/apple.png" },
  { id: 2, gambar: "apple", src: "Asset/Images/Kartu/apple.png" },
  { id: 3, gambar: "bananas", src: "Asset/Images/Kartu/bananas.png" },
  { id: 4, gambar: "bananas", src: "Asset/Images/Kartu/bananas.png" },
  { id: 5, gambar: "cherries", src: "Asset/Images/Kartu/cherries.png" },
  { id: 6, gambar: "cherries", src: "Asset/Images/Kartu/cherries.png" },
  { id: 7, gambar: "dragon fruit", src: "Asset/Images/Kartu/dragon-fruit.png" },
  { id: 8, gambar: "dragon fruit", src: "Asset/Images/Kartu/dragon-fruit.png" },
  { id: 9, gambar: "grapes", src: "Asset/Images/Kartu/grapes.png" },
  { id: 10, gambar: "grapes", src: "Asset/Images/Kartu/grapes.png" },
  { id: 11, gambar: "orange", src: "Asset/Images/Kartu/orange.png" },
  { id: 12, gambar: "orange", src: "Asset/Images/Kartu/orange.png" },
  { id: 13, gambar: "passion fruit", src: "Asset/Images/Kartu/passion-fruit.png" },
  { id: 14, gambar: "passion fruit", src: "Asset/Images/Kartu/passion-fruit.png" },
  { id: 15, gambar: "pineapple", src: "Asset/Images/Kartu/pineapple.png" },
  { id: 16, gambar: "pineapple", src: "Asset/Images/Kartu/pineapple.png" },
  { id: 17, gambar: "strawberry", src: "Asset/Images/Kartu/strawberry.png" },
  { id: 18, gambar: "strawberry", src: "Asset/Images/Kartu/strawberry.png" },
  { id: 19, gambar: "watermelon", src: "Asset/Images/Kartu/watermelon.png" },
  { id: 20, gambar: "watermelon", src: "Asset/Images/Kartu/watermelon.png" }
]


//function display gambar di kartu

let dbTemp = []

function randomGambar() {

  if (dbTemp.length === dbGambar.length) {
    return
  }
  let random = Math.floor(Math.random() * 20)
  let object = dbGambar[random]

  let validasi = validasiGambar(object) //

  if (validasi === false) {
    return object.src
  } else {
    return randomGambar()
  }
}

function validasiGambar(object) {

  for (let i = 0; i < dbTemp.length; i++) {
    let perObj = dbTemp[i]

    if (object.id === perObj.id) {
      return true
    }
  }

  dbTemp.push(object)
  return false
}

let cards = document.getElementsByClassName("cardImg")
for (let i = 0; i < cards.length; i++) {
  let perCard = cards[i] //object
  let Gambar = randomGambar()
  if (Gambar) {
    perCard.src = Gambar
  }

}

