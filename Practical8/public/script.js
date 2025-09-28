let counter = document.getElementById("counter");
let increaseBtn = document.getElementById("increase");
let decreaseBtn = document.getElementById("decrease");
let resetBtn = document.getElementById("reset");

let count = localStorage.getItem("repCount") 
            ? parseInt(localStorage.getItem("repCount")) 
            : 0;

counter.textContent = count;

increaseBtn.addEventListener("click", () => {
  count++;
  updateCounter();
});

decreaseBtn.addEventListener("click", () => {
  if(count > 0) count--;
  updateCounter();
});

resetBtn.addEventListener("click", () => {
  count = 0;
  updateCounter();
});

function updateCounter() {
  counter.textContent = count;
  localStorage.setItem("repCount", count); 
}
