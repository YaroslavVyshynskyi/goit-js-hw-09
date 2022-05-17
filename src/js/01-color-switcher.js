const body = document.querySelector("body");
const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
let backGround = null; 

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtn() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    backGround = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, 1000);
}

function onStopBtn() { 
    clearInterval(backGround);
    
    stopBtn.disabled = true;
    startBtn.disabled = false;
}