import "./style.css";

//HTML-CSS PREAMBLE

const gameContainer = document.createElement("div");
document.body.appendChild(gameContainer);

const button = document.createElement("button");
button.style.fontSize = "4em";
button.innerText = "Add";
gameContainer.appendChild(button);

const buttonsDiv = document.createElement("div");
gameContainer.appendChild(buttonsDiv);

const buyButtonA = document.createElement("button");
buyButtonA.disabled = true;
buyButtonA.style.fontSize = "4em";
buyButtonA.innerText = "Buy an autoclicker! - A";
buttonsDiv.appendChild(buyButtonA);

const buyButtonB = document.createElement("button");
buyButtonB.disabled = true;
buyButtonB.style.fontSize = "4em";
buyButtonB.innerText = "Buy an autoclicker! - B";
buttonsDiv.appendChild(buyButtonB);

const buyButtonC = document.createElement("button");
buyButtonC.disabled = true;
buyButtonC.style.fontSize = "4em";
buyButtonC.innerText = "Buy an autoclicker! - C";
buttonsDiv.appendChild(buyButtonC);

const counterDiv = document.createElement("div");
counterDiv.textContent = "🚶 total amount: 0";
gameContainer.appendChild(counterDiv);

const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = "0 people per second.";
gameContainer.appendChild(growthRateDiv);

//INTERFACE

interface Upgrade {
  name: string;
  count: number;
  rate: number;
}

const upgradeA: Upgrade = {
  name: "Upgrade A",
  count: 0,
  rate: 0.0001,
};

const upgradeB: Upgrade = {
  name: "Upgrade B",
  count: 0,
  rate: 0.0001,
};

const upgradeC: Upgrade = {
  name: "Upgrade C",
  count: 0,
  rate: 0.0001,
};

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

buyButtonA.addEventListener("click", () => {
  purchaseClickerTypeA();
});

buyButtonB.addEventListener("click", () => {
  purchaseClickerTypeB();
});

buyButtonC.addEventListener("click", () => {
  purchaseClickerTypeC();
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

function purchaseClickerTypeA() {
  autoClickRate += 0.0001;
  total -= 10;

  checkPrices();
  updateGrowthRateDiv();
}

function purchaseClickerTypeB() {
  autoClickRate += 0.002;
  total -= 100;

  checkPrices();
  updateGrowthRateDiv();
}

function purchaseClickerTypeC() {
  autoClickRate += 0.05;
  total -= 1000;

  checkPrices();
  updateGrowthRateDiv();
}

function updateGrowthRateDiv() {
  const rate: number = autoClickRate * 1000;
  growthRateDiv.innerText = (Math.trunc(rate * 100) / 100) +
    String(" people per second.");
}

function checkPrices() {
  //checks if the prices for any item in the shop are within the player's budget.
  if (total >= 10) {
    buyButtonA.disabled = false;
  } else {
    buyButtonA.disabled = true;
  }

  if (total >= 100) {
    buyButtonB.disabled = false;
  } else {
    buyButtonB.disabled = true;
  }

  if (total >= 1000) {
    buyButtonC.disabled = false;
  } else {
    buyButtonC.disabled = true;
  }
}
