const timer = (id, deadline) => { // будет получать два аргумента - селектор и время окончания

  // ф. получения остатк времени
const getTimeRemaining = (endtime) => { // endtime это deadline
//вичитаем конечную дату из текущей и получаем разницу в милисекундах
  const t = Date.parse(endtime) - Date.parse(new Date()); 
        //разбиваем на сек. часы и т.д. с делением на остаток чтобы получить целые значения
  const seconds = Math.floor((t / 1000) % 60); 
  const minutes = Math.floor((t / ( 1000 * 60)) % 60);
  const hours =  Math.floor((t / (1000 * 60 * 24)) % 24);
  const days =  Math.floor((t / (1000 * 60 * 24 * 24)));

  return { // вернем объект
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
   };

  };
   //ф. размешения значений в элементах - передаем селектор и конечную дату
   const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
    //внутри timer будем искать селекторы
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds'),
    //для остановки отсчета
    timeInterval = setInterval(updateClock, 1000);

       // добавляем нули к цифрам от 1 до 9. getZero добавляем в function updateClock()–ниже по коду
   function getZero(num) {
    if (num >=0 && num <10) {
        return `0${num}`;
    } else {
        return num;
    }
}
updateClock(); //запускаем сразу при загрузке  - убираем мигание счетчика при обновлении страницы

    //запускаем ф. внутри setClock
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if(t.total <=0) {
          clearInterval(timeInterval);
      }
  }
   };

  
 


setClock(id, deadline); // передавать значения  селектора и времени будем из main.js


}; // конец

export default timer;