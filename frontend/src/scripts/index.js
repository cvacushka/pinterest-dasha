import '../pages/index.css';
import { postCardToServer, deleteCardFromServer, fetchCardsFromServer } from './api.js';
import { enableValidation } from './validate.js';
/** Popup редактирования профиля */
const popupProfile = document.querySelector('.popup_type_profile');                     // Найти popup редактирования профиля
const popupOpenEdit = document.querySelector('.profile__edit-buton');                   // Найти кнопку открытия редактирования профиля
const popupFormProfile = popupProfile.querySelector('.popup__form_type_profile');       // Найти форму popup изменения профиля
const profileName = document.querySelector('.profile-info__title');                     // Найти данные - title на странице
const profileJob = document.querySelector('.profile-info__intro');                      // Найти данные - job на странице
const inputName = document.querySelector('.popup__input_type_name');                    // Найти поле ввода - title в форме редактирования профиля
const inputJob = document.querySelector('.popup__input_type_job');                      // Найти поле ввода - job в форме редактирования профиля

/** Popup редактирования карточек региона */
const popupPlace = document.querySelector('.popup_type_place');                          // Найти popup редактирования карточек
const popupOpenAdd = document.querySelector('.profile__add-button');                     // Найти кнопку открытия редактирования карточек
const popupFormPlace = popupPlace.querySelector('.popup__form_type_place');              // Найти форму popup изменения карточек
const popupFormTitle = popupPlace.querySelector('.popup__input_type_title');             // Найти поле ввода - название региона в форме добавления карточки
const popupFormLink = popupPlace.querySelector('.popup__input_type_link');               // Найти поле ввода - ссылки на фото в форме добавления карточки

/** Popup открытия просмотра изображения */
const popupImage = document.querySelector('.popup_type_image');                           // Найти popup открытия просмотра увеличенного изображения
const elementImage = document.querySelector('.popup__img');                               // Найти изображение
const elementTitle = document.querySelector('.popup__name');                              // Найти описание региона

/** Кнопка закрытия Popup */
const popupCloseList = document.querySelectorAll('.popup__button-close');                  // Найти ВСЕ кнопки закрытия Popup

/** Границы окна Popup */
const popupClosest = document.querySelectorAll('.popup');                                  // Найти границы окна при нажатии на Esc и Overlay

/** Добавление карточек */
const cardTemplate = document.querySelector('.template-card').content;                     // Найти шаблон карточки для добавления
const cardsContainer = document.querySelector('.elements');                                // Найти раздел, куда будут добавлятся карточки

const cardsApiUrl = 'http://backend-service/api/cards/';

/** Функция лайк-дизлайка карточки */
const bindCardLikeEventListener = (buttonLike) => {
  buttonLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button_active');
  });
};

/** Функция удаления карточки */
const bindCardDeleteEventListener = (cardData) => {
  cardData.addEventListener('click', (evt) => {
    const id = evt.target.closest('.element').id;
    deleteCardFromServer(cardsApiUrl, id);
    evt.target.closest('.element').remove()
  });
};


// Функция создания карты (как и прежде)
const createCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementTitle = cardElement.querySelector('.element__title');
  const element = cardElement.querySelector('.element');
  const cardElementPhoto = cardElement.querySelector('.element__img');
  const cardElementLike = cardElement.querySelector('.element__button');
  const cardElementDel = cardElement.querySelector('.element__basket');
  cardElementTitle.textContent = cardData.title;
  element.id = cardData.id;
  cardElementPhoto.src = cardData.url;
  cardElementPhoto.alt = cardData.alt;

  bindCardPreviewEventListener(cardElementPhoto);
  bindCardLikeEventListener(cardElementLike);
  bindCardDeleteEventListener(cardElementDel);

  return cardElement;
};

// Асинхронная функция для добавления карточек на страницу
const addCardsToPage = async (url) => {
  const cardsData = await fetchCardsFromServer(url);
  
  // Перебираем полученные данные и добавляем карточки на страницу
  cardsData.forEach(cardData => {
    const cardElement = createCard(cardData);
    cardsContainer.appendChild(cardElement);
  });
};

addCardsToPage(cardsApiUrl);


// Вызываем функцию для добавления карточек. Подставьте ваш URL.
/** Функция открытия просмотра изображения карточки */
const bindCardPreviewEventListener = (cardImageElement) => {
  cardImageElement.addEventListener('click', (evt) => {
    openPopup(popupImage);

    elementImage.src = cardImageElement.src;
    elementImage.alt = cardImageElement.alt;
    elementTitle.textContent = evt.target.closest('.element').textContent;
  });
};


/** Общая функция открытия Popup */
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupCloseEscapeKey);
};

/** Общая функция закрытия Popup */
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popupCloseEscapeKey);
};

/**Функция закрытия по клавише Esc */
const popupCloseEscapeKey = (evt) => {
  if (evt.key === 'Escape'){
    popupClosest.forEach((popup) => {
      closePopup(popup);
    })
  }
}

/** Функция открытия Popup редактирования профиля c указанными на странице данными */
popupOpenEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

/** Функция сохранения внесенных в формы popup изменений при закрытии окна */
popupFormProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
});

/** Закрытие всех Popup при нажатии на крестик */
popupCloseList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupClosestCross = popupAddClosest(evt);
    closePopup(popupClosestCross);
  });
});

/** Закрытие всех Popup при нажатии на Overlay */
popupClosest.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      const popupClosestOverlay = popupAddClosest(evt);
      closePopup(popupClosestOverlay);
    };
  });
});

/** Функция открытия Popup добавления карточки местности */
popupOpenAdd.addEventListener('click', () => {
  openPopup(popupPlace);
  popupFormTitle.value = '';
  popupFormLink.value = '';
});

/** Функция сохранения внесенных в формы popup данных (название региона и ссылку на фото) при закрытии окна */
popupFormPlace.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const cardData = {
    title: popupFormTitle.value,
    url: popupFormLink.value,
  };
  const serverResult = await postCardToServer(cardsApiUrl, cardData)
  renderCard(serverResult);

  evt.target.reset();
  closePopup(popupPlace);
});

/** Функция добавления новой карточки в начало блока с данными из PopUp добавления новой карточки местности */
const renderCard = (card) => {
  cardsContainer.prepend(createCard(card));
};

/**Функция возвращения события */
const popupAddClosest = (evt) => {
  return evt.target.closest('.popup');
}
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
