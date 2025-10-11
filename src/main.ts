import "./style.css";

//HTML-CSS PREAMBLE

const gameContainer = document.createElement("div");
document.body.appendChild(gameContainer);

const button = document.createElement("button");
button.style.fontSize = "4em";
button.innerText = "Add";
gameContainer.appendChild(button);

const buyButton = document.createElement("button");
buyButton.disabled = true;
buyButton.style.fontSize = "4em";
buyButton.innerText = "Buy an autoclicker!";
gameContainer.appendChild(buyButton);

const counterDiv = document.createElement("div");
counterDiv.textContent = "🚶 total amount: 0";
gameContainer.appendChild(counterDiv);

const growthRateDiv = document.createElement("div");
counterDiv.textContent = "0 people per second.";
gameContainer.appendChild(growthRateDiv);

//VARIABLES RELEVANT TO GAMEPLAY

//duration until next autoclick occurs
let autoClickRate = 0;
//previous time that the autoclick function was called
let prevAutoClickTime: number | null = null;
//total amount of clicks
let total = 0;

//EVENT LISTENERS

button.addEventListener("click", () => {
  buttonClick();
});

buyButton.addEventListener("click", () => {
  purchaseClicker();
});

//ANIMATION

requestAnimationFrame(autoClick);

//FUNCTIONS

function buttonClick() {
  //console.log("total amount: ", String(total));
  addToTotal(1);
}

function autoClick() {
  if (prevAutoClickTime == null) {
    prevAutoClickTime = performance.now();
  }

  const deltaTime = (performance.now() - prevAutoClickTime) * autoClickRate;

  addToTotal(1 * deltaTime);

  prevAutoClickTime = performance.now();
  requestAnimationFrame(autoClick);
}

function addToTotal(input: number) {
  total += input;
  updateCounter(total);
  checkPrices();
}

function updateCounter(input: number) {
  counterDiv.innerText = String("🚶 total amount: ") +
    (Math.trunc(input * 100) / 100);
}

function purchaseClicker() {
  autoClickRate += 0.001;
  total -= 10;

  checkPrices();
  updateGrowthRateDiv();
}

function updateGrowthRateDiv() {
  let rate: number = autoClickRate * 1000;
  growthRateDiv.innerText = rate + String(" people per second.");
}

function checkPrices() {
  //checks if the prices for any item in the shop are within the player's budget.
  if (total >= 10) {
    buyButton.disabled = false;
  } else {
    buyButton.disabled = true;
  }
}
