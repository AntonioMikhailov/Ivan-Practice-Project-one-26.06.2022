const checkNumInputs = (selector)=> { // будем передавать селектор для проверки
const inputNum = document.querySelectorAll(selector);

//проверяем input на ввод только цифрр
//Копируем из forms.js этот шаблон а там убираем и оставляем только вызов этого модуля
inputNum.forEach(item => { 
  item.addEventListener('input', ()=> { 
    //проверять проще через регул. выражения - если юзер введет НЕчисло то этот символ удалится - точнее юзер не сможет ввести буквы
    item.value = item.value.replace(/\D/, ''); 
  });
 });

};

export default checkNumInputs; //