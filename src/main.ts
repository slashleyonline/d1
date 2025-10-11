import "./style.css";

const button = document.createElement("button");
button.style.fontSize = "4em";
button.innerText = "Add";
document.body.appendChild(button);

const counterDiv = document.createElement("div");
counterDiv.textContent = "🚶 total amount: 0";
document.body.appendChild(counterDiv);

//duration until next autoclick occurs
const autoClickDuration = 0.001;
//previous time that the autoclick function was called
let prevAutoClickTime: number | null = null;
//total amount of clicks
let total = 0;

button.addEventListener("click", () => {
  buttonClick();
});

requestAnimationFrame(autoClick);

function buttonClick() {
  console.log("total amount: ", String(total));
  total += 1;
  updateCounter(total);
}

function autoClick() {
  if (prevAutoClickTime == null) {
    prevAutoClickTime = performance.now();
  }

  const deltaTime = (performance.now() - prevAutoClickTime) * autoClickDuration;

  total += 1 * deltaTime;
  updateCounter(total);

  prevAutoClickTime = performance.now();
  requestAnimationFrame(autoClick);
}

function updateCounter(input: number) {
  counterDiv.innerText = String("🚶 total amount: ") + Math.trunc(input);
}
