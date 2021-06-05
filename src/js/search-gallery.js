import '../saas/main.scss';
import * as basicLightbox from 'basiclightbox';
import debounce from 'lodash.debounce';
import { alert } from '@pnotify/core';
import { formRef, galleryRef, btnLoadRef} from './refs';
import 'basiclightbox/dist/basicLightbox.min.css';
import ApiService from './apiService';
import cardsTpl from '../templates/photo-card.hbs';
                     
formRef.addEventListener('submit', onSearchCard);
galleryRef.addEventListener('click', onCardClick);
btnLoadRef.addEventListener('click', debounce(onBtnLoadClick, 500));

const apiService = new ApiService();

function onSearchCard(event) {
  event.preventDefault();
  apiService.query = event.target.elements.query.value;
  if (!apiService.query) {
    clearCard();
    return alert('Начните с ввода в поле поиска');
  }
  apiService.resetPage();
  clearCard();
  getCard();
}

function addCard(card) {
  const imageCard = cardsTpl(card);
  galleryRef.insertAdjacentHTML('beforeend', imageCard);
}

async function getCard() {
  try {
    const cardArray = await apiService.searchImages();
    console.log(cardArray);
    addCard(cardArray);
  } catch (error) {
    console.log(error);
  }
}

function clearCard() {
  galleryRef.innerHTML = '';
}

function onScrollCard() {
  setTimeout(() => {
    btnLoadRef.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }, 1000)
}

function onBtnLoadClick() {
  getCard();
  onScrollCard();
}

function onCardClick(event) {
 if (event.target.nodeName !== 'IMG') {
  return;
  }
  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.src}">`
  );
  instance.show();
}
