import "./style.css";

//HTML-CSS PREAMBLE

const gameContainer = document.createElement("div");
gameContainer.id = "gameContainer";
document.body.appendChild(gameContainer);

const addButtonDiv = document.createElement("div");
addButtonDiv.id = "clicker";
gameContainer.appendChild(addButtonDiv);

const button = document.createElement("button");
button.style.fontSize = "4em";
button.innerText = "Add";
addButtonDiv.appendChild(button);

const counterDiv = document.createElement("div");
counterDiv.textContent = "🚶 total amount: 0";
addButtonDiv.appendChild(counterDiv);

const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = "0 people per second.";
addButtonDiv.appendChild(growthRateDiv);

const buttonsDiv = document.createElement("div");
buttonsDiv.id = "shop";
gameContainer.appendChild(buttonsDiv);

//INTERFACE

//Upgrade Interface for buyable items

interface Upgrade {
  name: string;
  count: number;
  rate: number;
  price: number;
}

//FOR ALL ITEMS, MAKE A FUNCTION THAT ADDS BUTTONS BASED ON THE ITEM
const upgrades: Upgrade[] = [{
  name: "upgradeA",
  count: 0,
  rate: 0.0001,
  price: 10,
}, {
  name: "upgradeB",
  count: 0,
  rate: 0.002,
  price: 100,
}, {
  name: "upgradeC",
  count: 0,
  rate: 0.05,
  price: 1000,
}, {
  name: "upgradeD",
  count: 0,
  rate: 0.5,
  price: 10000,
}];

interface purchaseButton {
  upgradeData: Upgrade;
  buyButton: HTMLButtonElement;
}

//VARIABLES

//duration until next autoclick occurs
let autoClickRate = 0;
//previous time that the autoclick function was called
let prevAutoClickTime: number | null = null;
//total amount of clicks
let total = 0;
//array of butttons with upgrade data
const purchaseButtonList: purchaseButton[] = [];

//EVENT LISTENERS

button.addEventListener("click", () => {
  buttonClick();
});

//ANIMATION

requestAnimationFrame(autoClick);

//FUNCTIONS

function addButtons() {
  for (const upgrade of upgrades) {
    createButton(upgrade);
  }
}

function createButton(input: Upgrade) {
  const newButton = document.createElement("button");
  newButton.disabled = true;
  newButton.style.fontSize = "4em";
  newButton.innerText = "Buy an autoclicker! - " + input.name;
  buttonsDiv.appendChild(newButton);

  newButton.addEventListener("click", () => {
    purchaseClicker(getUpgrade(input.name));
  });
  const newButtonInterface: purchaseButton = {
    upgradeData: input,
    buyButton: newButton,
  };
  purchaseButtonList.push(newButtonInterface);
}

function buttonClick() {
  //console.log("total amount: ", String(total));
  addToTotal(1);
}

function autoClick() {
  if (prevAutoClickTime == null) {
    prevAutoClickTime = performance.now();
  }

  const deltaTime = (performance.now() - prevAutoClickTime) * autoClickRate;
  addToTotal(deltaTime);

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

function getUpgrade(UpgradeName: string): Upgrade | null {
  for (const i of upgrades) {
    if (i.name === UpgradeName) {
      return i;
    }
  }
  return null;
}

function purchaseClicker(type: Upgrade | null) {
  if (type === null) {
    return;
  }
  autoClickRate += type.rate;
  total -= type.price;
  type.price *= 1.15;
  type.count += 1;

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
  for (const button of purchaseButtonList) {
    if (total >= button.upgradeData.price) {
      button.buyButton.disabled = false;
    } else {
      button.buyButton.disabled = true;
    }
  }
}

addButtons();
