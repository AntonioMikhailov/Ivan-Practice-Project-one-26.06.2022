const images = () => {

  // создаем модалку - именно в JS  а не берем из верстки
  const imgPopup = document.createElement('div');
  //получаем обертку галереи фото
  const workSection  = document.querySelector('.works');
  //создаем большое фото в теге img 
  const bigImage = document.createElement('img');
  bigImage.style.maxWidth = '100%';
  // добавим созданному div класс popup который ранее использовали для показа модалки
  imgPopup.classList.add('popup');
  workSection.appendChild(imgPopup);


  // По ТЗ надо разместить фото по центру модалки. 1 - можно найти стиль в уже созданных стилях 2 - можно прописать inline стили и 3  - можно добавить здесь через cssText
 
  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignItems = 'center';
  // imgPopup.style.display = 'flex'; // 
  
  // и уже внутрь созданного div помещаем фото
  imgPopup.appendChild(bigImage);

  //Создаем обработчик
  workSection.addEventListener('click', (e)=> { 
    //т.к. фото ссылками то
    e.preventDefault();
   
    let target = e.target; // получиv конкретное фото превью
    console.log(target);
    //проверяем что фото имеет определен. класс
    if(target.classList.contains('preview'))
    imgPopup.style.display = 'flex';
    //попробовал добавить анимацию - но толком не работает
    imgPopup.style.visibility = 'visible';
  imgPopup.style.opacity = 1;
  imgPopup.style.transition = 'all 0.5s ease .0s';
  document.body.style.overflow = 'hidden';
    //Верстка сделана так что  в ссылке лежит большое фото и внутри нее же лежит превью которое видно на сайте. Будем искать большое фото по имени в пути - оно в ссылке родителе
    const path  = target.parentNode.getAttribute('href'); // получим ссылку конкретного фото
    //теперь мы вставляем полученный из ссылки src и путь к большому фото в созданный элемент
  bigImage.setAttribute('src', path);

  if(target.matches('div.popup') ) {
    // imgPopup.style.display = 'none';
    //анимацию добавил я 
     imgPopup.style.visibility = 'hidden';
  imgPopup.style.opacity = 0;
  document.body.style.overflow = '';

  }

});


};

export default images;