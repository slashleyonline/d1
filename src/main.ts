import "./style.css";

const button = document.createElement("button");
button.style.fontSize = "4em";
button.innerText = "Add";
document.body.appendChild(button);

let total = 0;

button.addEventListener("click", () => {
  console.log("1 person added!");
  total += 1;
});
