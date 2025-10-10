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
});

setInterval(buttonClick, 1000);

function buttonClick() {
  console.log("total amount: ", String(total));
  total += 1;
  updateCounter(total);
}

function updateCounter(input: number) {
  counterDiv.innerText = String("🚶 total amount: ") + input;
}
