import "./style.css";

const button = document.createElement("button");
button.style.fontSize = "4em";
button.innerText = "Add";
document.body.appendChild(button);

const counterDiv = document.createElement("div");
counterDiv.textContent = "🚶 total amount: 0";
document.body.appendChild(counterDiv);

let total = 0;

button.addEventListener("click", () => {
  buttonClick();
});

requestAnimationFrame(autoClick);

//we gotta give this the axe.
//setInterval(buttonClick, 1000);

function buttonClick() {
  console.log("total amount: ", String(total));
  total += 1;
  updateCounter(total);
}

function autoClick() {
  total += 1 / 60;
  updateCounter(total);
  requestAnimationFrame(autoClick);
}

function updateCounter(input: number) {
  counterDiv.innerText = String("🚶 total amount: ") + input;
}
