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
      text: "Please enter your name",
    });
    return;
  }
  localStorage.setItem("playerName", name);
  window.location.href = "HTMLGame/Game.html";
}

// Fungsi untuk memulai game
// function startGame() {
//   const container = document.getElementById("mainContainer");
//   container.classList.add("fade-out");

//   setTimeout(() => {
//     // Redirect ke halaman game
//     window.location.href = "onet-game.html";
//   }, 500);
// }

// Easter egg: tekan spasi untuk start
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    startGame();
  }
});
