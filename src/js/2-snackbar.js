import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"

const form = document.querySelector(".form")

form.addEventListener('submit', event => {
  event.preventDefault()
  const delayInput = event.currentTarget.elements.delay.value
  const stateRadios = event.currentTarget.elements.state.value
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(delayInput, stateRadios)
        if (stateRadios === "fulfilled") { resolve() }
        else { reject() }
    }, delayInput);
  });

promise
  .then(value => {
    iziToast.success({  
      message: `✅ Fulfilled promise in ${delayInput}ms`})
    })
  .catch(error => {
    iziToast.error({          
      message: `❌ Rejected promise in ${delayInput}ms`})
  });
});