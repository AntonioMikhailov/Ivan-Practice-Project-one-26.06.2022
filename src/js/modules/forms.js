import checkNumInputs from "./checkNumInputs";
// import modals from "./modals";

const forms = (state)=> {
//получаем все формы и все input
const form = document.querySelectorAll('form');
const inputs = document.querySelectorAll('input');
//для ввода только цифр в телефоны 
// const phoneInputs = document.querySelectorAll('input[name="user_phone"]'); // уже не надо

//проверяем input телефона на ввод только цифрр
checkNumInputs('input[name="user_phone"]'); // передаем селектор
//уже не надо т.к. checkNumInputs в отдельном модуле
// phoneInputs.forEach(item => { 
//   item.addEventListener('input', ()=> { 
//     //проверять проще через регул. выражения - если юзер введет НЕчисло то этот символ удалится - точнее юзер не сможет ввести буквы
//     item.value = item.value.replace(/\D/, ''); 
//   });
//  });

//оповещаем юзера о процессе отправки - создадим объект с текстами
const message = {
loading: 'Загрузка',
success: 'Спасибо, мы скоро с Вами свяжемся',
failure: 'Что то пошло не так...',
};

//ф. отправки
//т.к. запрос асинхронный и сервер может долго отвечать -то JS скрипт не будет ждать а пойдет работать дальше - чтобы это предотвратить async/await
const postData = async (url, data)=> {
  //при начале отправке показываем сообщение
document.querySelector('.status').textContent = message.loading;

let res = await fetch(url, { // ждать должен
  method: POST,
  body: data,
  //для formData заголовок не надо добавлять
});
return await res.text();
};

//доп. ф по очистке input
const clearInput = ()=> {
inputs.forEach(item => { 
  item.value = ''; 
 });
};

//навешиваем обработчики
form.forEach(item => { 
  item.addEventListener('submit', (e)=> { 
    e.preventDefault(); // убираем перезагрузку страницы
    //подготавливаем форму - для показа сообщений о процессе отправки
    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    item.appendChild(statusMessage); //устаревший? append надо?

    //собираем все данные из формы с formData c помощью конструктора FormData ( если нужен формат JSON то надо сконвертировать)
    const formData = new FormData(item); // из какой формы получать
//проверяем в форме атрибут - для добавления объекта state
if(item.getAttribute('data-calc') == 'end') {
// елси да то берем объект state и свойства  разбираем на ключи и значения и добавлять в formData через цикл for in
for (let key in state) {
  //передаем ключ и значение
  formData.append(key, state[key]);
}
}

    // вызываем ф. и передаем путь и данные формы
    postData('assets/server.php', formData)
    //далее получаем ответ в виде текста
    .then(res => {
      console.log(res);
      //если успешно прошел запрос пишем сообщение юзеру
      statusMessage.textContent = message.success;
    })
    //если будет ошибка то catch
    .catch( ()=> {
      statusMessage.textContent = message.failure;
    })
    //finally для очистки полей и скрытия сообщения об отправке
    .finally(() => {
      clearInput(); // вызвали ф. очистки полей
      setTimeout(() => {
        // modals();
        statusMessage.remove(); //просто удаляем элемент через таймер
        // закрываем все модалки после кнопки Отправить
        const windows = document.querySelectorAll('[data-modal]');
        windows.forEach(item => {
          item.style.visibility = 'hidden';
          item.style.opacity = 0;
          item.style.transition = 'all 0.7s ease .0s'; 
           document.body.style.overflow = '';
        });

      }, 3000);
    });
 });
 });


}; //конец forms

export default forms; // по умолчанию экспортируем