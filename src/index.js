import './saas/main.scss';
import * as basicLightbox from 'basiclightbox';
import { defaults } from '@pnotify/core';
import { alert, notice, info, success, error } from '@pnotify/core';

import ApiService from './apiService';
import cardsTpl from './templates/photo-card.hbs';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const btnLoadRef = document.querySelector('.button');
const img = document.querySelector('img');
                     
   formRef.addEventListener('input', onSearchCard);
galleryRef.addEventListener('click', onCardClick);
btnLoadRef.addEventListener('click', onBtnLoadClick);

const apiService = new ApiService();

function onSearchCard(event) {
  event.preventDefault();
  apiService.query = event.currentTarget.elements.query.value;

  apiService.resetPage();
  clearCard();
  getCard();
  btnLoadRef.disabled = false;
}
async function getCard() {
  try {
    const cardArray = await apiService.searchImages();
    console.log(cardArray);
    if (!cardArray.length) {
      alert({
        text: 'Неверный запрос, повторите новый!!!',
        delay: 1500,
      });
    }
    addCard(cardArray);
  } catch (error) {
    console.log(error);
  }
}
function addCard(card) {
  galleryRef.insertAdjacentHTML('beforeend', cardsTpl(card));
}

function clearCard() {
  galleryRef.innerHTML = '';
}
function onBtnLoadClick() {
  getCard();
  galleryRef.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
function onCardClick(event) {
  const foundCard = event.target.classlist.contains('gallery-card');
  if (!foundCard) {
    return;
  }
  const largeImg = event.target.getAttribute('data-large');
  const instance = basicLightbox.create(
    `<img src="${largeImg}" width="800" height="600">`,
  );
  instance.show();
}

function respondToTheTick(e) {
  const largeImageUrl = e.target.nextElementSibling.src;

  const instance = basicLightbox.create(
    `<img src="${largeImageUrl}" width="800">`,
  );
  if (e.target.localName === 'img') {
    instance.show();
  }
}
