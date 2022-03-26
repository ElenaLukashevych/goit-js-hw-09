
import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');



formEl.addEventListener('submit', onFormsubmit);


function createPromise(position, delay) {

 const promise = new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
    // Fulfill
      } else {
        reject({ position, delay });
    // Reject
  }

     
    }, delay);



 });
  
promise
  .then(onSuccess)
  .catch(onFailure);
  
};


function onSuccess({ position, delay }) {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);

};


function onFailure({ position, delay }) {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);

}


  

function onFormsubmit(evt) {
  evt.preventDefault();

  const delay = evt.currentTarget.elements.delay;
  const amountValue = evt.currentTarget.elements.amount.value;
  const step = evt.currentTarget.elements.step;
  
  let stepValue = Number(step.value);

  let delayValue = Number(delay.value);

  

  for (let i = 1; i <= Number(amountValue); i += 1) {
    createPromise(i, delayValue);
    delayValue += stepValue;
  }



};