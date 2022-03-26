
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

  let delayValue = evt.currentTarget.elements.delay.value;
  const amountValue = evt.currentTarget.elements.amount.value;
  const stepValue = evt.currentTarget.elements.step.value;

  // let delayValue = formEl.elements.delay.value;
  // const amountValue = formEl.elements.amount.value;
  // const stepValue = formEl.elements.step.value;
  

  for (let i = 1; i <= Number(amountValue); i += 1) {
    createPromise(i, delayValue);
    delayValue += stepValue;
  }



};