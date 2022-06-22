export class Accordeon {
  constructor(options = {}) {
    const {
      containerSelector = null,
      triggerSelector = null,
      toggleClass = null,
      addClassOnInit = false,
      toggleStyle = 'displayChange',
    } = options;

    this.containerSelector = containerSelector;
    this.triggerSelector = triggerSelector;
    this.toggleClass = toggleClass;
    this.addClassOnInit = addClassOnInit;
    this.toggleStyle = toggleStyle;

    this.isOpen = true;

    this.init();
  }
  init() {
    this.container = document.querySelector(this.containerSelector);
    if (!this.container) return;
    this.container.addEventListener('click', (e) => this.toggle(e, this.toggleStyle));

    if (this.addClassOnInit) {
      this.addClass(this.toggleClass);
    }
  }

  //Добавляет указанный класс каждому блоку (елементу, который откр./закр.)
  addClass(className) {
    let triggers = document.querySelectorAll(this.triggerSelector);

    if (!triggers) {
      //нужно прокинуть ошибку
      console.error('triggers: error');
      return;
    }
    triggers.forEach((trigger) => {
      trigger.classList.add(className);
    });
  }

  getStyles(el, prop) {
    return getComputedStyle(el).getPropertyValue(prop);
  }

  toggleDisplay(el) {
    if (el.style.display === 'none') {
      el.style.display === 'block';
    } else if (el.style.display !== 'none') {
      el.style.display === 'block';
    }
  }
  setHeight(el) {
    if (!el) return;
    //при первом скрытии, если нет инлайновой высоты (хайт === ''), то блок не анимируется транзишеном
    //поэтому сперва выставляю высоту, а потом уже все норм, естессно при самых простых случаях
    //в сложных нужна другая проверка, по типа флага мб.
    // let cssHeight = this.getStyles(el, 'height');

    // if (el.style.height === '' && cssHeight !== '0px') {
    //   el.style.height = el.scrollHeight + 'px';
    //   setTimeout(() => {
    //     el.style.height = '0px';
    //   }, 100);
    // } else if (el.style.height === '0px' || cssHeight === '0px') {
    //   el.style.height = el.scrollHeight + 'px';
    // } else if (el.style.height !== '0px') {
    //   el.style.height = '0px';
    // }

    let heightUnsetCondition = el.style.height === '';

    if (heightUnsetCondition) {
      //если высота не назначена инлайн
      el.style.height = el.scrollHeight + 'px'; //задаем
      setTimeout(() => {
        el.style.height = '0px'; //и сразу убираем, чтобы было плавно
      }, 100);
    } else if (el.style.height === '0px') {
      el.style.height = el.scrollHeight + 'px';
    } else {
      el.style.height = '0px';
    }
  }

  toggle(e, toggleStyle) {
    const trigger = e.target.closest(this.triggerSelector);

    if (!trigger) return;

    if (!this.container.contains(trigger)) return;

    const panel = trigger.nextElementSibling;

    if (!panel) return;

    trigger.classList.toggle(this.toggleClass);

    if (toggleStyle === 'displayChange') {
      this.toggleDisplay(panel);
    } else if (toggleStyle === 'maxHeight') {
      this.setHeight(panel);
    }
  }
}

// const acoordeon = new Accordeon({
//   containerSelector: '.accordeon(Селектор аккордеона)',
//   triggerSelector: '.item-accordeon__top(Верхний(который будет открываться)) блок аккордеона',
//   toggleClass: 'hidden', --> Класс, который будет переключаться
//   addClassOnInit: true, --> Добавляет 'toggleClass' при инициализации (по ум. 'false')
// })

//Можно не выставлять высоту открываемой (нижней) части
