import checkNumInputs from "./checkNumInputs";

const changeModalState = (state)=> {
//при экспорте будет передавать состояние state - state.form и т.д.
const windowForm = document.querySelectorAll('.balcon_icons_img '); //все табы фото
//Ширина и высота
const windowWidth = document.querySelectorAll('#width');
const windowHeight = document.querySelectorAll('#height');
//тип профиля -  в списке select
const windowType = document.querySelectorAll('#view_type');
//выбор теплый-холодный
const windowProfile = document.querySelectorAll('.checkbox');


//создадим одну ф. для сбора всех данных - принимать будет три аргумента - событие , элемент и property -свойство объекта которое будем изменять в state
function bindActionToElems (event, elem, prop) {
  elem.forEach((item, i) => { 
    item.addEventListener(event, ()=> { 

       switch (item.nodeName) { // ищем тип Node
        case 'SPAN': // именно прописными т.к. именно в таком виде придет
          console.log('span');
          state[prop] = i;
          break;
        case 'INPUT':  
        if(item.getAttribute('type') =='checkbox') {
          console.log('checkbox');
//проверяем  = если первый чекбокс то холодный если нет  - горячее остекленение
      i== 0 ? state[prop] = 'Холодное' : state[prop] = 'Горячее';
      //чтобы юзер мог только один отметить - пройдем циклом по всем и оставим только тот на котором бюыл клик
      elem.forEach((box, j) => { // нельзя уже item
        box.checked = false;
        if (i == j) { // i из индекса чекбокса по которому кликнули
          box.checked = true;
        }
      });

        } else { // если не чекбокс значит простой input
          console.log('input');
          state[prop] = item.value;
        }
        break;
      case 'SELECT': 
      console.log('select');
      state[prop] = item.value; // у option есть value
      
          break;
       } 

      // // проверяем на массив или единичный элемент
      // if(elem.length >1) {
      //   state[prop] = i; // создадим новое поле в объекте и передадим в объект modalState индекс таба
      // } else {
      //   state[prop] = item.value;
      // }
   
    console.log(state); // {form:1} {form:2} и т.д.
     });
  });
}
//вызываем и передаем аргументы
bindActionToElems('click', windowForm, 'form'); // form будет имя свойства в объекте
//для высоты и ширины размеров
bindActionToElems('input', windowWidth, 'width');
bindActionToElems('input', windowHeight, 'height');
//тип профиля -  с select - надо событие change
bindActionToElems('change', windowType, 'type'); 
// чекбоксы теплый -холодный
bindActionToElems('change', windowProfile, 'profile');



// Получаем все Табы
// windowForm.forEach((item, i) => {
//   item.addEventListener('click', ()=> { 
//    state.form = i; // создадим новое поле в объекте и передадим в объект modalState индекс таба
//   console.log(state); // {form:1} {form:2} и т.д.
//    });
// });
//проверяем на ввод цифр
checkNumInputs('#width');
checkNumInputs('#height');

}; // конец

export default changeModalState;