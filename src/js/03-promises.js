import Notiflix from 'notiflix';

const inputDelay = document.querySelector("input[name=delay]");
const inputStep = document.querySelector("input[name=step]");
const inputAmount = document.querySelector("input[name=amount]");
const submitBtn = document.querySelector("button");

submitBtn.addEventListener('click', onSubmitBtn);

function onSubmitBtn(event) {
  event.preventDefault();
  const startDelay = Number(inputDelay.value);
  const stepDelay = Number(inputStep.value);
  const amount = Number(inputAmount.value);
  let delay = startDelay - stepDelay;
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    delay = delay + stepDelay;
    createPromise(position, delay);
  }   
}

function createPromise(position, delay) {
  
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}