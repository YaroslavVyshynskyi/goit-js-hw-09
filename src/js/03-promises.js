const form = document.querySelector(".form");
const inputDelay = document.querySelector("input[name=delay]");
const inputStep = document.querySelector("input[name=step]");
const inputAmount = document.querySelector("input[name=amount]");
const submitBtn = document.querySelector("button");

submitBtn.addEventListener('click', onSubmitBtn);



function onSubmitBtn(event) {
  event.preventDefault();
  const startDelay = inputDelay.value;
  const stepDelay = inputStep.value;
  const amount = inputAmount.value;
  const delay = startDelay;
  for (let i = 0; i < 3; i + 1) {
    const position = i;
    // const delay = startDelay;
    const delay = 0 + stepDelay;
    // createPromise(position, delay);
    console.log(position, delay);
  }
}


// function createPromise(position, delay) {
//   console.log(position, delay);
//   // return new Promise((resolve, reject) => {
//   //   const shouldResolve = Math.random() > 0.3;
//   //   setTimeout(() => {
//   //     if (shouldResolve) {
//   //       // Fulfill
//   //       resolve('получилось');
      
//   //     } else {
//   //       // Reject
//   //       reject('Hit');
//   //     }
//   //   }, delay)
        
//   //     })
//   //     promise
//   //       .then(({ position, delay }) => {
//   //         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   //       })
//   //       .catch(({ position, delay }) => {
//   //         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   //       });
// }  