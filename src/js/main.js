import "./slider";
import modals from "./modules/modals";
import tabs from "./modules/tabs";
import forms from "./modules/forms";
import changeModalState from "./modules/changeModalState";
import timer from "./modules/timer";
import images from "./modules/images";



//ждем загрузки всей страницы а потом вызываем ф.
window.addEventListener('DOMContentLoaded', ()=> {
  //здесь вызываем все модули

  //состояние модалки с Калькулятором - данные сохраняем
let modalState = {}; // в него попадают данные из changeModalState(modalState)

changeModalState(modalState); // активируем-подключаем модуль и передаем пустой объект в который получим обратно данные из полей ввода
  modals();
  //вызываем первый Таб
  tabs('.glazing_slider','.glazing_block', '.glazing_content', 'active');
  //active не надо точку  т.к. add(activeClass)
  //вызываем второй Таб из секции decoration
  tabs('.decoration_slider ','.no_click', '.decoration_content > div > div', 'after_click');
  // вызываем табы которые в модалке с Калькулятором - которые inline
tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block'); // inline-block = display в параметрах ф.
  forms(modalState);
  let deadline = '2022-07-03'
  timer('.container1', deadline);
  images();




}); // конец loaded


