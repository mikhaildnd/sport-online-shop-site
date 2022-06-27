import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
import noUiSlider from 'nouislider';
import { slideToggle } from './modules/slideToogle.js';
import { Accordeon } from './modules/toggle-accordeon.js';
import { cardDetailsControl, headerViewToggler } from './modules/helpers.js';
import { TabManager } from './modules/tabs-manager.js';

import 'nouislider/dist/nouislider.css';

/* Product tabs */
const productTabs = new TabManager('product-tabs', {
  tabListSelector: '.info-product__nav',
  tabBtnSelector: '.info-product__item',
  tabPanelSelector: '.info-product__block',
  tabParams: {
    // disableTabActiveClass: false,
    tabActiveClass: 'js-active-tab',
  },
  panelParams: {
    // disablePanelActiveClass: false,
    panelActiveClass: 'show',
  },
  keyboard: true,
});

/* Checkout tabs */
const checkoutTabs = new TabManager('checkout-tabs', {
  tabListSelector: '.content-checkout__nav',
  tabBtnSelector: '.content-checkout__item',
  tabPanelSelector: '.content-checkout__block',
  tabParams: {
    // disableTabActiveClass: false,
    tabActiveClass: 'js-active-tab',
  },
  panelParams: {
    // disablePanelActiveClass: false,
    panelActiveClass: 'show',
  },
  keyboard: true,
});

/* Bottom part of header toggler */
headerViewToggler({
  selector: '.header__bottom',
  activeClass: 'hide',
});

/* Product card toggle */
cardDetailsControl({
  container: ['.products-slider__item', '.catalog__products'],
  openButtonSelector: '.item-product__detail-button',
  closeButtonSelector: '.hover-item-product__close-icon',
  cardSelector: '.item-product',
  classToAdd: 'active',
});

/* Price range slider */
const stepsSlider = document.querySelector('.price-filter__slider');
const priceFromInput = document.querySelector('.js-input-left');
const priceToInput = document.querySelector('.js-input-right');
const pricePnputs = [priceFromInput, priceToInput];

if (stepsSlider) {
  noUiSlider.create(stepsSlider, {
    start: [0, 200000],
    connect: true,
    step: 1000,
    range: {
      'min': 0,
      'max': 200000,
    },
    format: {
      to: (value) => parseInt(value),
      from: (value) => Number(parseInt(value)),
    },
  }),
    stepsSlider.noUiSlider.on('update', (values, handle) => {
      pricePnputs[handle].value = values[handle];
    });
  pricePnputs.forEach((input) => {
    input.addEventListener('change', () => {
      stepsSlider.noUiSlider.set([this.value, null]);
    });
  });
}

/* Filter scripts */
const filterAcсordeon = new Accordeon({
  containerSelector: '.filter',
  triggerSelector: 'button.section-filter__top',
  toggleClass: 'hidden',
  addClassOnInit: false,
  toggleStyle: 'maxHeight',
});

const filter = document.querySelector('.page__filter');
const filterCloseIcon = document.querySelector('.filter__close-button');
const filterTrigger = document.querySelector('.catalog-bar__filter-trigger');

if (filterCloseIcon) {
  filterCloseIcon.addEventListener('click', () => {
    filter.classList.remove('js-open');
  });
}
if (filterTrigger) {
  filterTrigger.addEventListener('click', () => {
    filter.classList.add('js-open');
  });
}

/* Каталог товаров */
const menuPageBurger = document.querySelector('.menu-page__burger-button');
const menuPageBody = document.querySelector('.menu-page__body');
menuPageBurger.addEventListener('click', () => {
  menuPageBurger.classList.toggle('active');

  let ariaLabelStateCondition = 'true' === menuPageBurger.getAttribute('aria-expanded');
  menuPageBurger.setAttribute('aria-expanded', !ariaLabelStateCondition),
    ariaLabelStateCondition
      ? menuPageBurger.setAttribute('aria-label', 'Открыть меню')
      : menuPageBurger.setAttribute('aria-label', 'Закрыть меню');

  slideToggle(menuPageBody);
});

/* Каталог лист */
if (window.matchMedia('(min-width: 768px)').matches) {
  const menuParents = document.querySelectorAll('.menu-page__parent');

  const enterEvts = ['mouseenter', 'focusin'];
  const leaveEvts = ['mouseleave', 'focusout'];

  menuParents.forEach((item) => {
    const enterHandler = () => {
      item.classList.add('active');
      enterEvts.forEach((evt) => {
        item.removeEventListener(evt, enterHandler);
      });
      leaveEvts.forEach((evt) => {
        item.addEventListener(evt, leaveHandler);
      });
    };
    const leaveHandler = () => {
      item.classList.remove('active');

      enterEvts.forEach((evt) => {
        item.addEventListener(evt, enterHandler);
      });
      leaveEvts.forEach((evt) => {
        item.removeEventListener(evt, leaveHandler);
      });
    };

    item.addEventListener('mouseenter', enterHandler);
    item.addEventListener('focusin', enterHandler);
  });
} else {
  const menuParents = document.querySelectorAll('.menu-page__parent>a');

  menuParents.forEach((item) => {
    item.addEventListener('click', (e) => {
      item.parentElement.classList.toggle('active');
      e.preventDefault();
    });
  });
}

/* Поиск */
const sortButton = document.querySelector('.search-bar__sort-button');
const categoriesSearch = document.querySelector('.categories-search');
if (sortButton) {
  sortButton.addEventListener('click', (e) => {
    e.preventDefault();
    sortButton.classList.toggle('search-bar__sort-button--active');
    slideToggle(categoriesSearch);
  });
}

/* Burger */
let iconMenu = document.querySelector('.icon-menu');
if (iconMenu != null) {
  // let delay = 500;
  let menuBody = document.querySelector('.top-header__dropdown-menu');
  iconMenu.addEventListener('click', () => {
    // if (unlock) {
    // body_lock(delay);
    iconMenu.classList.toggle('active');
    menuBody.classList.toggle('active');
    // }
  });
}

const mainThumbSlider = new Swiper('.thumb-slider.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  centerInsufficientSlides: true,
});

/* Main slider */
const mainslider = new Swiper('.mainslider__body', {
  modules: [Thumbs],
  thumbs: {
    swiper: mainThumbSlider,
  },
  slidesPerView: 1,
  spaceBetween: 0,
});

/* Products slider */
const productsSlider = new Swiper('.products-slider__item', {
  modules: [Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: '.products-slider__info',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.products-slider__arrow--next',
    prevEl: '.products-slider__arrow--prev',
  },
  breakpoints: {
    475: {
      slidesPerView: 2,
    },
    650: {
      slidesPerView: 3,
    },
    768: {
      spaceBetween: 20,
      slidesPerView: 3,
    },
    1024: {
      spaceBetween: 10,
      slidesPerView: 3,
    },
    1200: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
  },
});

/* Brands slider */
const brandsSlider = new Swiper('.brands-slider .swiper', {
  modules: [Navigation],
  slidesPerView: 5,
  // slidesPerView: 'auto',
  spaceBetween: 20,
  navigation: {
    nextEl: '.brands-slider__button--next',
    prevEl: '.brands-slider__button--prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    440: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
    1180: {
      slidesPerView: 5,
    },
  },
});

/* Product slider & Thumb-product slider */
const imagesSubSlider = new Swiper('.images-product__subslider', {
  slidesPerView: 4,
  spaceBetween: 0,
  speed: 800,
});

const imagesMainSlider = new Swiper('.images-product__mainslider', {
  modules: [Thumbs],
  slidesPerView: 1,
  spaceBetween: 0,
  thumbs: {
    swiper: imagesSubSlider,
  },
  speed: 800,
});
