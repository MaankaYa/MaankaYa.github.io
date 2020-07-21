// Переменные
const userInfoButton = document.querySelector('.user-info__button'); //Открытие формы. Кнопка "+" открывает пустую форму карточки. querySelector - метод поиска, возвращает первый элемент, соответствующий CSS-селектору.
const popup = document.querySelector('.popup'); //Открытие формы. Родитель кнопки "X", которая закрывает форму.
const popupClose = document.querySelector('.popup__close');//Закрытие формы. Кнопка "X" закрывает форму.
const placesList = document.querySelector('.places-list');//Лайк и Удаление карточки. Контейнер для карточек и родитель кнопок "Корзина" и "Лайк"
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
  }
];
const popupForm = document.querySelector('.popup__form');//Добавление элемента card. Oбращение к форме.
const editProfilePopup = document.querySelector('#popup-edit'); //Открывает окно «Редактировать профиль». Родитель кнопки "X", которая закрывает форму.
const buttonEditProfile = document.querySelector('.button_edit_profile'); //Открывает окно «Редактировать профиль». Кнопка Edit
const popupCloseEditProfile = document.querySelector('#popup__close-edit'); //Закрытие окна «Редактировать профиль». Кнопка "X", которая закрывает форму.
const editProfileForm = document.querySelector('.popup__form_edit');//Редактирование профиля. Oбращение к форме
const imagePopup = document.querySelector('#popup-image');//Открытие попапа с картинкой.
const popupImageBig = document.querySelector('#popup_image_big'); //Открытие попапа с картинкой. Картинка в попапе.
const popupCloseImage = document.querySelector('#popup__close_image');//Закрытие попапа с картинкой
//Валидация кнопки сохранить
const inputUserName = document.querySelector(".popup__input_type_user-name");
const inputUserAbout = document.querySelector(".popup__input_type_user-about");
const editButton = document.querySelector(".popup-edit__button");
// Валидация кнопки новое место
const placeName = document.querySelector(".popup__input_type_name");
const placeImage = document.querySelector(".popup__input_type_link-url");
const postButton = document.querySelector(".popup__button");
const errorElement = document.querySelector(`.error-message`);//Валидация формы «Редактировать профиль»


// Функции

// Открытие формы "Новое место"
function openForm() {
  popup.classList.add('popup_is-opened');
  setEventListeners(popup);

  // Очистка полей вода
  postButton.classList.remove("popup__button_enabled");
  postButton.setAttribute("disabled", true);
 
  placeName.value = "";
  placeImage.value = "";
}

//Закрытие формы "Новое место"
function closeForm() {
  popup.classList.remove('popup_is-opened');
}

//Лайк и Удаление карточки
function likeDeleteCard(event) {
  if (event.target.classList.contains('place-card__like-icon')) { //event.target – это элемент, с которого курсор перешел/ушёл. Он содержит элемент, на котором сработало событие. Метод classList.contains проверяет наличие класса, что клик произошёл по сердечку с классом place-card__like-icon.
    event.target.classList.toggle('place-card__like-icon_liked'); //метод classList.toggle только в этом случае добавляет класс place-card__like-icon_liked, т.е. добавляет класс, если его нет, иначе удаляет.
  } else if (event.target.classList.contains('place-card__delete-icon')) {//Проверяем клик по корзине
    placesList.removeChild(event.target.closest('.place-card')); //метод closest поднимается вверх от элемента и проверяет каждого из родителей. Если он соответствует селектору, поиск прекращается.
  }
}

//Добавление карточки
function createCard(nameValue, linkValue) {
  const placeCard = document.createElement("div");//Создаём элемент div и кладём его в переменную placeCard
  placeCard.classList.add("place-card"); //добавляем класс place-card

  //Метод insertAdjacentHTML позволяет вставить строку HTML кода в любое место страницы. Код вставляется
  //относительно опорного элемента. Синтаксис "опорный элемент.insertAdjacentHTML(способ вставки, код для
  //вставки)". Способ "beforeEnd" - Вставим элемент в конец опорного элемента.

  placeCard.insertAdjacentHTML('beforeend', `
    <div class="place-card__image">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name"></h3>
      <button class="place-card__like-icon"></button>
    </div>`
  );

  placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${linkValue})`; //Свойство style используется для получения определенного стиля в backgroundImage.
  placeCard.querySelector(".place-card__name").textContent = nameValue; //Свойство textContent устанавливает текстовое содержимое place-card__name.

  return placeCard;
}

function loadCards(array) { //Создаем функцию, которая будет загружать карты из массива).
  array.forEach(function (item) {
    let newCard = createCard(item.name, item.link); //Так как карточек много в initialCards, то нужно пробегать по массиву с помощью метода forEach. Бежим по массиву и для для каждого элемента сначала добавляем карточку createCard.
    placesList.appendChild(newCard);//Потом после создания карточки (она у нас в переменной newCard) добавляем ее в разметку через appendChild, этот метод добавит ее в конец.
  });
}

// Добавление элемента card.
function addCard(event) {
  event.preventDefault();//Метод preventDefault - отменяет действие браузера по умолчанию, избегает перезагрузки страницы

  const name = popupForm.elements.name; //Oбратимся к элементам формы по имени
  const link = popupForm.elements.link;

  //После создания функции createCard, вызываем её внутри addCard, передав аргументы name, link свойству value каждого текстового поля формы.
  const cardContainer = createCard(name.value, link.value);

  placesList.appendChild(cardContainer); //cardContainer элемент добавляется в разметку методом appendChild.

  popup.classList.remove('popup_is-opened');//убираем класс "popup_is-opened" у элемента popup при клике по крестику.

  popupForm.reset(); //все поля формы popupForm сбрасываем до значений по умолчанию.
}

//Добавление карточки по нажатию на Enter.
function addCardEnt(event) {
  if (event.key === 'Enter') {
    popup.classList.add('popup_is-opened');
  } 
}

//Открытие окна «Редактировать профиль». 
function openEditProfile() {
  editProfilePopup.classList.add('popup_is-opened');
  
  const name = editProfileForm.elements.userName;
  const self = editProfileForm.elements.userAbout;
  name.value = document.querySelector('.user-info__name').textContent;
  self.value = document.querySelector('.user-info__job').textContent;

  editButton.setAttribute('enabled', true);
  editButton.classList.add('popup-edit__button_enabled');

  setEventListeners(popup);
}

// Закрытие окна «Редактировать профиль»
function closeEditProfile() {
  if (editProfilePopup.classList.contains('popup_is-opened')) {//Проверяем клик по родителю кнопки "X", которая закрывает форму.
    editProfilePopup.classList.remove('popup_is-opened');
  } 
}

//Редактирование профиля
function getDataProfile(event) {
  event.preventDefault();
  const name = editProfileForm.elements.userName;
  const self = editProfileForm.elements.userAbout;
  document.querySelector('.user-info__name').textContent = name.value;
  document.querySelector('.user-info__job').textContent = self.value;
  closeEditProfile();
}

//Открытие попапа с картинкой
function openPopupImage(event) {
  if (event.target.classList.contains('place-card__image')) { //клик по картинке
    imagePopup.classList.add('popup_is-opened');
    popupImageBig.src = event.target.style.backgroundImage.slice(5, -2);
  }
}

//Закрытие попапа с картинкой
function closePopupImage() {
  if (document.querySelector('#popup-image').classList.contains('popup_is-opened')) {
    document.querySelector('#popup-image').classList.remove('popup_is-opened');
  }
}

//Валидация формы «Редактировать профиль»
// Колбэк для слушателей валидации
function handleValidate(event) {
  checkInputValidity(event.target);
}
  
// Активация ошибки валидации
function activateError(element) {
  const errorMessage = document.querySelector(`#${element.id}`);
  errorMessage.classList.add("error-message_active");
}

function checkInputValidity(element) {
  const errorElement = document.querySelector(`#error-${element.name}`);

  if (!element.validity.valid) {
    if (
      element.value.length <= Number(element.getAttribute("minlength")) ||
      element.value.length >= Number(element.getAttribute("maxlength"))
    ) {
      if (element.validity.valueMissing) {
        errorElement.textContent = "Это обязательное поле";
      } else {
        errorElement.textContent = "Должно быть от 2 до 30 символов";
      }
      if (element.validity.typeMismatch) {
        errorElement.textContent = "Здесь должна быть ссылка";
      }
    }
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}
 
//setEventListeners — функция добавления обработчиков
function setEventListeners(popup) {
  const form = popup.querySelector('form');

  function validate(event) {
    checkInputValidity(event.target, event.target.closest('.error-message__hidden'));
  }
 
  form.addEventListener('input', validate);
}


// Обработчики
userInfoButton.addEventListener('click', openForm); //Открытие формы. Добавим обработчик события на саму кнопку методом addEventListener, т.е. свяжем функцию openForm с кнопкой «+» userInfoButton.
popupClose.addEventListener('click', closeForm);//Закрытие формы
placesList.addEventListener('click', likeDeleteCard);//Лайк и Удаление карточки. Добавим обработчик события на саму кнопку методом addEventListener, т.е. свяжем функцию likeDeleteCard с кнопками Лайк и Корзина с помощью родителя кнопок placesList.
popupForm.addEventListener('submit', addCard);// Добавление элемента card. Обрабатывает событие добавления карточки.

buttonEditProfile.addEventListener('click', openEditProfile);//Открывает окно «Редактировать профиль». Добавим обработчик события на саму кнопку методом addEventListener, т.е. свяжем функцию openEditProfile с кнопкой «Edit» buttonEditProfile.
popupCloseEditProfile.addEventListener('click', closeEditProfile);// Закрытие окна «Редактировать профиль»
editProfileForm.addEventListener('submit', getDataProfile);//Редактирование профиля

//Открытие попапа с картинкой

placesList.addEventListener('click', openPopupImage);

popupCloseImage.addEventListener('click', closePopupImage);//Закрытие попапа с картинкой

//Валидация формы «Редактировать профиль»
inputUserName.addEventListener("input", handleValidate);
inputUserAbout.addEventListener("input", handleValidate);

// Валидация кнопки сохранить
editProfilePopup.addEventListener("input", function() {
  if (inputUserName.value.length >= 2 && inputUserAbout.value.length >= 2) {
    editButton.classList.add("popup-edit__button_enabled");
  } else {
    editButton.classList.remove("popup-edit__button_enabled");
	  editButton.removeAttribute('disabled');
  }
});

// Валидация кнопки новое место
popup.addEventListener("input", function() {
  if (placeName.value.length >= 2 && placeImage.value.length >= 2) {
    postButton.classList.add("popup__button_enabled");
	  postButton.removeAttribute('disabled');
    postButton.classList.remove('button_disabled');
  } else {
    postButton.classList.remove("popup__button_enabled");
	  postButton.setAttribute('disabled', true);
    postButton.classList.add('button_disabled');
  }
});

// Вызов функций
loadCards(initialCards);

/*В целом по работе:
В основном свободно и правильно применяются конструкции языка js.
Используется делегирование событий.
Перезагрузка страницы предотвращена инструкцией event.preventDefault.
Функциям и константам даны названия, имеющие смысл.
Код логично организован.
Использована функция insertAdjacentHTML для вставки размётки.
Функции в стиле function declaration (именованые функции) объявлены в коде до их вызова.
Отсутствуют неиспользуемые переменные и функции
Код хорошо структурирован и стилизован
Функционал полностью соответствует заданию.
*/





