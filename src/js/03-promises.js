import Notiflix from 'notiflix';

const form = document.querySelector(".form");

form.addEventListener('submit', onSubmitBtn);

function onSubmitBtn(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount }
  } = event.currentTarget;

  let totalDelay = Number(delay.value) - Number(step.value);
  
  for (let i = 0; i < amount.value; i++) {
    const position = i + 1;
    totalDelay = totalDelay + Number(step.value);
    createPromise(position, totalDelay);
  }   
}

function createPromise(position, totalDelay) {
  
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, totalDelay });
      } else {
        reject({ position, totalDelay });
      }
    }, totalDelay);
  });

  promise
    .then(({ position, totalDelay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${totalDelay}ms`);
    })
    .catch(({ position, totalDelay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${totalDelay}ms`);
    });
}