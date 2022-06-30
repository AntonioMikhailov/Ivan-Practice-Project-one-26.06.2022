const modals =()=> {


  // первым аргументом сама кнопка , вторым какое окно открывать, + селектор который будет закрывать это окно
  const windows = document.querySelectorAll('[data-modal]');
 function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) { 

  const trigger = document.querySelectorAll(triggerSelector);
 const modal = document.querySelector(modalSelector);
 //т.к. класс popup_close есть еще и в других секциях ограничиваем видимость нужной секцией popup_engineer
 const close = document.querySelector(closeSelector);


 //Убираем сдвиг контента при модалке
   //получаем ширину полосы прокрутки
   let innerWidth = window.innerWidth;
   
   // let outerWidth = window.outerWidth; // нет не работает т.к. при браузере на полном окне не определяет разницу
   let outerWidth = document.body.clientWidth;
 
   
  //  console.log(outerWidth); //836
   let contentShift = innerWidth - outerWidth;
  //  console.log(contentShift); // 17
 //ф. плавного появления полосы прокрутки
 function fadeScroll() {
 setTimeout(() => {
    document.body.style.marginRight = 0 +'px';
    document.body.style.overflow = '';
  
   },   300); // ставим 200-300 если анимация 300 - тогда не виден скачоу именно внутри модалки
 }

  //на trigger из параметра навешиваем обработчик
  //надо помнить что не все триггеры именно button а могут быть и ссылка - a и будет перезагрузка страницы а нам это не надо - поэтому preventDefault
  trigger.forEach(item => { 
  item.addEventListener('click', (e)=> { 
      // очищаем показ модалки по таймеру при кликах юзера
  clearTimeout(clearShowModal);
    //проверяем что кликнули на элемент который имеет event событие
    if(e.target) {
      e.preventDefault();
    }
//для всех модалок закрытие - здесь как дополнение - этот код закроет все а ниже откроет ту модалку что была вызывана
windows.forEach(item => {
  item.style.visibility = 'hidden';
  item.style.opacity = 0;
  item.style.transition = 'all 0.3s ease .0s'; 
});

    //получаем из параметра  modal и показываем
    // modal.style.display = 'block';
//добавляю анимацию- Я - можно сделать отдел. ф. анимации появления
modal.style.visibility = 'visible';
modal.style.opacity = 1;
modal.style.transition = 'all 0.3s ease .0s'; 
    //блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = contentShift +'px';
    // console.log(document.body.style.marginRight);
  
}); 
 });
// закрываем по крестику
close.addEventListener('click', ()=> { 
// дополнительно закрытие всех модалок
windows.forEach(item => {
  item.style.visibility = 'hidden';
  item.style.opacity = 0;
  item.style.transition = 'all 0.3s ease .0s'; 
  fadeScroll();
  // document.body.style.marginRight = 0 +'px';

});
  // modal.style.display = 'none';
  modal.style.visibility = 'hidden';
  modal.style.opacity = 0;
  modal.style.transition = 'all 0.3s ease .0s'; 
  

 });
   //закрываем по фону
   modal.addEventListener('click', (e)=> { 
    if(e.target == modal && closeClickOverlay == true) {
      // дополнительно закрытие всех модалок
  // windows.forEach(item => {
  //   item.style.display = 'none';
  // });
  windows.forEach(item => { // именно так а не просто d-none т.к. везде стоит анимация
    item.style.visibility = 'hidden';
    item.style.opacity = 0;
    item.style.transition = 'all 0.3s ease .0s'; 
    // document.body.style.marginRight = 0 +'px';
    fadeScroll();
  });
     
      // modal.style.display = 'none';
      modal.style.visibility = 'hidden';
      modal.style.opacity = 0;
      modal.style.transition = 'all 0.3s ease .0s'; 
      // document.body.style.overflow = '';     
   }
   });

  
 } // конец bindModal
   //Показываем модалку через таймер
   let clearShowModal;
  function showModalByTime(selector, time) { 
  clearShowModal = setTimeout(() => {
    //чтобы меньше писать всем назначу переменную modal
    let modal =  document.querySelector(selector);
   modal.style.visibility = 'visible';
   modal.style.opacity = 1;
    modal.style.transition = 'all 0.3s ease .0s'; 
      //блокируем прокрутку страницы
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = contentShift +'px';
    }, time);
  }
  //Вызываем показ модалки по таймеру
  // showModalByTime('.popup', 3000); // отключил

 
 //передаем аргументы в bindModal для модалки
 //теперь вызываем ф. и передаем ей все селекторы - так мы можем вызывать любую модалку только меняя аргументы-селекторы классов
 bindModal('.popup_engineer_btn','.popup_engineer', '.popup_engineer .popup_close');

//Вызывваем еще раз ф. bindModal уже по клику с других кнопок
bindModal('.phone_link','.popup', '.popup .popup_close');

//Вызываем модалку по кнопкам Рассчитать стоимость 
bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false);
//Вызываем следующую модалку с выбором Профиля в цепочке по клику на кнопке Далее
bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
//Вызываем последнюю модалку с данными юзера в цепочке по клику на кнопке Далее
bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);



}; //конец modals
export default modals; // по умолчанию экспортируем