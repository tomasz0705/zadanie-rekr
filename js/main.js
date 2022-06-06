const btn = document.querySelector(".cta");
const popUp = document.querySelector(".popup");
const closeBtn = document.querySelector(".closer");
const resetBtn = document.querySelector(".resetButton");
const counter = document.getElementById("clicks");

btn.addEventListener("click", (event) => {
  event.preventDefault();
  popUp.style.display = "flex";

  countOfClicks();
  saveClicksToLocalStorage(clicks);
});

closeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  popUp.style.display = "none";
});

document.onclick = (event) => {
  if (event.target.id === "popup") {
    popUp.style.display = "none";
  }
};

let clicks = 0;
const countOfClicks = () => {
  clicks += 1;
  counter.innerHTML = clicks;

  if (clicks > 5) {
    resetBtn.style.display = "block";
    resetBtn.addEventListener("click", (event) => {
      event.preventDefault();
      clicks = 0;
      resetBtn.style.display = "none";
      localStorage.clear();
    //   counter.innerHTML = clicks;
    renderAllRecipes();
      alert("localStorage cleared");
    });
  }
};

const saveClicksToLocalStorage = (clicks) => {
  let dataFromLocalStorage = [];
  if (localStorage.getItem("countOfClicks") != null) {
    // jeśli są to konwertujemy je i zapisujemy do zmiennej
    dataFromLocalStorage = JSON.parse(localStorage.getItem("countOfClicks"));
    // dodajemy nowy obiekt
    dataFromLocalStorage.push(clicks);
    // i zapisujemy do localStorage
    localStorage.setItem("countOfClicks", JSON.stringify(dataFromLocalStorage));
  } else {
    // jeśli nie ma to tworzymy nową wartość w localStorage i dodajemy
    dataFromLocalStorage.push(clicks);
    localStorage.setItem("countOfClicks", JSON.stringify(dataFromLocalStorage));
  }
  alert("Number of clicks saved to localStorage");
};

const renderAllRecipes = () => {
  // czyścimy wyrenderowane wcześniej kliknięcia
  counter.innerHTML = "0";
  // konwertujemy dane z localStorage
  let allClicks = JSON.parse(localStorage.getItem("countOfClicks"));
  counter.innerHTML = allClicks[allClicks.length - 1];
};

// renderAllRecipes();