import"./assets/styles-8b80152a.js";import{i as o}from"./assets/vendor-77e16229.js";const i=document.querySelector(".form");i.addEventListener("submit",s=>{s.preventDefault();const e=Number(s.currentTarget.elements.delay.value),r=s.currentTarget.elements.state.value;new Promise((t,m)=>{setTimeout(()=>{console.log(e,r),r==="fulfilled"?t(e):m(e)},e)}).then(t=>{o.success({message:`✅ Fulfilled promise in ${e}ms`})}).catch(t=>{o.error({message:`❌ Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map
