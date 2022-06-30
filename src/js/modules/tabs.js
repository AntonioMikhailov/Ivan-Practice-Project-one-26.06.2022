//Здесь Иван сразу в глав.ф прописывает все аргументы, т.е. не создает внутри tabs функцию для работы как в modals
// Важно! вызывать ее будем из main.js и там же передавать селекторы в параметры
const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
  //получаем элементы
  const header = document.querySelector(headerSelector);
  const tab = document.querySelectorAll(tabSelector);
  const content = document.querySelectorAll(contentSelector);

//функция скрытия контента
function hideTabContent() { 
  content.forEach(item => { 
    item.style.display = 'none'; 
   });
   //класс активности прячем у всех
   tab.forEach(item => { 
     item.classList.remove(activeClass);  
    });
 
}

//функция показа контента - параметр i это индекс таба который нужно показать
function showTabContent(i =0) { // первый покажем по умолчанию
  // внесем изменения - вместо block ставим display = display; как в параметрах ф.
 content[i].style.display = display; 
 // если например в верстке используется не block а flex то можно передавать в ф аргументы isBlock isFlex 08-05
  //класс активности показываем у таба
  tab[i].classList.add(activeClass);  
  }

  //вызываем две ф.и показывем контент по умолчанию
  hideTabContent();
  showTabContent(0); 

//отслеживаем какой именно таб кликнул юзер
header.addEventListener('click', (e)=> { 
  console.log(555);
  //т.к. e.target часто нужен  - в переменную его
  const target = e.target; // куда был клик
  //проверяем что клик был по  одному из табов - но нужно в проверкке отделить точку от селектора .classClass т.к. classList ждет без точки. Нужны регулярные выражения - убрать точку
  //Также во вторую проверку добавляем что кликбыл на родительском элементе
  if(target.classList.contains(tabSelector.replace(/\./, '' )) || target.parentNode.classList.contains(tabSelector.replace(/\./, '' )))   {
    tab.forEach((item, i) => { 
      //здесь еще одна проверка??? ЕСли target будет равна тому элементу который сейчас перебирается. Не знаю  - зачем такая проверка??
      if( target == item || target.parentNode == item) {
        hideTabContent();
        showTabContent(i);  //передаем индекс
      }
     });

  }

 
});


};//конец tabs
export default tabs; // по умолчанию экспортируем