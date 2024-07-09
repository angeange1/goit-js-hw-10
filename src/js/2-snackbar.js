import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"

const form = document.querySelector(".form")

form.addEventListener('submit', event => {
  event.preventDefault()
  const delayInput = Number(event.currentTarget.elements.delay.value)
  const stateRadios = event.currentTarget.elements.state.value
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(delayInput, stateRadios)
        if (stateRadios === "fulfilled") {resolve(delayInput)}
        else {reject(delayInput)}
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


// Поправила (було просто resolve(), reject().) / Відсутнє використання значення
// проміса: Хоча проміс було налаштовано правильно,
//   ви забули передати затримку при вирішенні чи відхиленні проміса.
//   Виклики resolve та reject усередині промісу повинні бути resolve(delayInput)
//   та reject(delayInput), щоб наступні обробники.then та.catch
//   отримали значення затримки.

  // Поправила / Доброю практикою є парсинг користувацького вводу за допомогою 
// Number(delayInput) для того, щоб він оброблявся як числове значення,
//   особливо з огляду на те, що він використовується для встановлення тривалості
// тайм - ауту.

// ? / Послідовне форматування коду: Переконайтеся, що всі відступи, 
// пробіли та розміщення фігурних дужок { } є послідовними по всьому коду 
// для зручності читання.Існують деякі невідповідності у форматуванні,
//   такі як пробіли всередині зворотного виклику setTimeout та методи then та catch