//DONE.

import "./style.css";

//HTML-CSS PREAMBLE

const gameContainer = document.createElement("div");
gameContainer.id = "gameContainer";
document.body.appendChild(gameContainer);

const addButtonDiv = document.createElement("div");
addButtonDiv.id = "clicker";
gameContainer.appendChild(addButtonDiv);

const button = document.createElement("button");
button.id = "clickerButton";
button.style.fontSize = "4em";
button.style.backgroundColor = "#ccff66";
button.innerText = "🍎";
addButtonDiv.appendChild(button);

const counterDiv = document.createElement("div");
counterDiv.textContent = "🚶 total amount: 0";
addButtonDiv.appendChild(counterDiv);

const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = "0 apples per second.";
addButtonDiv.appendChild(growthRateDiv);

const buttonsDiv = document.createElement("div");
buttonsDiv.id = "shop";
gameContainer.appendChild(buttonsDiv);

//INTERFACE

//Upgrade Interface for buyable items

interface Upgrade {
  name: string;
  count: number;
  symbol: string;
  rate: number;
  price: number;
  desc: string;
}

//FOR ALL ITEMS, MAKE A FUNCTION THAT ADDS BUTTONS BASED ON THE ITEM
const upgrades: Upgrade[] = [{
  name: "Green Apple",
  symbol: "🍏",
  count: 0,
  rate: 0.0001,
  price: 10,
  desc: `Big and yummy green apple, 
    gives you energy to pick more apples! 
    increases rate by 0.1.`,
}, {
  name: "Farmer",
  symbol: "🧑‍🌾",
  count: 0,
  rate: 0.001,
  price: 100,
  desc: `More hands picking more apples! 
  Increases rate by 1`,
}, {
  name: "Apple Tree",
  symbol: "🌳",
  count: 0,
  rate: 0.05,
  price: 1000,
  desc: `More trees growing more fruit! 
  Increases rate by 50`,
}, {
  name: "Apple Demon",
  symbol: "👿",
  count: 0,
  rate: 0.5,
  price: 10000,
  desc: `Summons an evil apple demon that conjures more apples! 
  Increases rate by 500`,
}, {
  name: "Apple Dimension",
  symbol: "🌪️",
  count: 0,
  rate: 5,
  price: 1000000,
  desc: `Opens a vortex to the apple dimension. 
  Increases rate by 5000`,
}];

interface purchaseButton {
  upgradeData: Upgrade;
  buyButton: HTMLButtonElement;
  shopSlot: HTMLDivElement;
  priceSlot: HTMLDivElement;
  upgradeCounter: HTMLDivElement;
}

//VARIABLES

//duration until next autoclick occurs
let autoClickRate = 0;
//previous time that the autoclick function was called
let prevAutoClickTime: number | null = null;
//total amount of clicks
let total = 1000000;
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
  const newButton = createButtonHTML(input);

  const shopDiv = document.createElement("div");
  shopDiv.id = "shopEntry";

  const priceDiv = document.createElement("div");
  priceDiv.innerText = String("🍎 " + input.price);
  priceDiv.id = "priceSlot";

  const upgradeCounter = document.createElement("div");
  upgradeCounter.id = "upgradeCounter";
  upgradeCounter.style.fontSize = "x-large";
  upgradeCounter.innerText = "None";

  const descDiv = document.createElement("div");
  descDiv.innerText = input.desc;
  descDiv.id = "descDiv";

  shopDiv.appendChild(upgradeCounter);
  shopDiv.appendChild(priceDiv);
  shopDiv.appendChild(newButton);
  shopDiv.appendChild(descDiv);
  buttonsDiv.appendChild(shopDiv);

  newButton.addEventListener("click", () => {
    purchaseClicker(getUpgrade(input.name));
  });
  const newButtonInterface: purchaseButton = {
    upgradeData: input,
    buyButton: newButton,
    shopSlot: shopDiv,
    priceSlot: priceDiv,
    upgradeCounter: upgradeCounter,
  };
  purchaseButtonList.push(newButtonInterface);
}

function createButtonHTML(input: Upgrade): HTMLButtonElement {
  const newButton = document.createElement("button");
  newButton.disabled = true;
  newButton.style.fontSize = "4em";
  newButton.innerText = "Buy - " + input.symbol + " " + input.name;
  newButton.id = "buyButton";

  return newButton;
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
  counterDiv.innerText = String("🍎 total amount: ") +
    (Math.trunc(input));
}

function getUpgrade(upgradeName: string): Upgrade | null {
  for (const i of upgrades) {
    if (i.name === upgradeName) {
      return i;
    }
  }
  return null;
}

function getButton(input: Upgrade): purchaseButton | null {
  for (const i of purchaseButtonList) {
    if (i.upgradeData.name === input.name) {
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

  updatePriceDiv(type);
  updateUpgradeCounter(type);
  checkPrices();
  updateGrowthRateDiv();
}

function updateUpgradeCounter(type: Upgrade) {
  console.log("updating counter! count: ", type.count);
  const purchaseButton = getButton(type);
  const counterDiv = purchaseButton?.upgradeCounter;
  if (counterDiv != undefined) {
    if (counterDiv.innerText === "None") {
      counterDiv.innerText = "";
    }
    counterDiv.innerText += type.symbol;
  }
}

function updatePriceDiv(type: Upgrade) {
  const purchaseButton = getButton(type);
  const priceDiv = purchaseButton?.priceSlot;
  if (priceDiv != undefined) {
    priceDiv.innerText = "🍎 " + Math.ceil(type.price);
    console.log("updating price! ", type.price);
  } else {
    console.log("undefined!");
  }
}

function updateGrowthRateDiv() {
  const rate: number = autoClickRate * 1000;
  growthRateDiv.innerText = (Math.trunc(rate * 100) / 100) +
    String(" apples per second.");
}

function checkPrices() {
  //checks if the prices for any item in the shop are within the player's budget.
  for (const button of purchaseButtonList) {
    if (total >= button.upgradeData.price) {
      button.buyButton.disabled = false;
      button.buyButton.style.color = "black";
    } else {
      button.buyButton.style.color = "#B8860B";
      button.buyButton.disabled = true;
    }
  }
}

addButtons();
