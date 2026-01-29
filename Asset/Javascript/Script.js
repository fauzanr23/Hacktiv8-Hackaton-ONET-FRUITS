// Function Kondisi saat Musik On and Off.

let music = document.getElementById("audio");
let musicOn = false;

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

// Function Kondisi untuk dark and light Mode

function btnControlMode() {
  if (document.body.classList.contains("light")) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  }
}

// Function untuk input nama

function btnInputName() {
  const name = document.getElementById("nameInput").value;

  if (name === "") {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Masukkan nama dulu ya",
    });
    return;
  }
  localStorage.setItem("playerName", name);
  window.location.href = "game.html";
}

window.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("playerName");
  const nameText = document.getElementById("playerNameText");

  if (nameText) {
    if (name) {
      nameText.textContent = "Selamat datang " + name;
    } else {
      nameText.textContent = "Selamat datang Player";
    }

    startTimer();
  }
});

// Fungsi untuk waktu
let time = 60;
let timer = null;
let paused = false;

function startTimer() {
  document.getElementById("time").textContent = time;

  timer = setInterval(() => {
    if (!paused) {
      time--;
      document.getElementById("time").textContent = time;

      if (time === 0) {
        clearInterval(timer);
        Swal.fire({
          icon: "error",
          title: "Game Over",
          text: "Waktu habis!",
        });
      }
    }
  }, 1000);
}

// Fungsi untuk memulai game
function startGame() {
  const container = document.getElementById("mainContainer");
  container.classList.add("fade-out");

  setTimeout(() => {
    // Redirect ke halaman game
    window.location.href = "onet-game.html";
  }, 500);
}

// Easter egg: tekan spasi untuk start
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    startGame();
  }
});

// Fungsi untuk waktu
function togglePause() {
  const icon = document.getElementById("pauseIcon");

  paused = !paused; // toggle true/false

  if (paused) {
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
  } else {
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  }
}
