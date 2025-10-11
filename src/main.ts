import "./style.css";

const gameContainer = document.createElement("div");
document.body.appendChild(gameContainer);

const button = document.createElement("button");
button.style.fontSize = "4em";
button.innerText = "Add";
gameContainer.appendChild(button);

const buyButton = document.createElement("button");
buyButton.style.fontSize = "4em";
buyButton.innerText = "Buy an autoclicker!";
gameContainer.appendChild(buyButton);

const counterDiv = document.createElement("div");
counterDiv.textContent = "🚶 total amount: 0";
document.body.appendChild(counterDiv);

//DEFAULT duration until next autoclick occurs
let autoClickRate = 0;

//previous time that the autoclick function was called
let prevAutoClickTime: number | null = null;
//total amount of clicks
let total = 0;

button.addEventListener("click", () => {
  buttonClick();
});

buyButton.addEventListener("click", () => {
  purchaseClicker();
});

requestAnimationFrame(autoClick);

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
}

function updateCounter(input: number) {
  counterDiv.innerText = String("🚶 total amount: ") + Math.trunc(input);
}

function purchaseClicker() {
  autoClickRate += 0.001;
}
